import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { URL } from 'node:url';
import { chromium } from '@playwright/test';

const configuredUrl = process.env.ANALYTICS_PRODUCTION_URL ?? process.env.PUBLIC_SITE_URL;

assert(configuredUrl, 'Defina ANALYTICS_PRODUCTION_URL com a origem HTTPS que será auditada.');
assert.equal(
  process.env.ANALYTICS_ALLOW_SYNTHETIC_PAGEVIEWS,
  '1',
  'Defina ANALYTICS_ALLOW_SYNTHETIC_PAGEVIEWS=1: a auditoria envia dois pageviews sintéticos.',
);

const target = new URL(configuredUrl);
assert.equal(target.protocol, 'https:', 'A auditoria aceita somente produção HTTPS.');
assert.equal(target.pathname, '/', 'Informe somente a origem, sem caminho.');
assert.equal(target.search, '', 'Informe somente a origem, sem query.');
assert.equal(target.hash, '', 'Informe somente a origem, sem fragmento.');

const sensitiveMarkers = ['bruno.teste@example.com', 'utm_secret_test', 'sensitive-fragment'];
const allowedPayloadKeys = new Set(['dp', 'o', 'r', 'sdkn', 'sdkv', 'sv', 'ts']);
const excludedRoutes = ['/privacidade', '/termos', '/entrar', '/rota-inexistente-ana-004'];

function isAnalyticsLoader(requestUrl) {
  const url = new URL(requestUrl);
  return url.origin === target.origin && /^\/[a-z0-9]+\/script\.js$/iu.test(url.pathname);
}

function isAnalyticsView(request) {
  const url = new URL(request.url());
  return (
    request.method() === 'POST' &&
    url.origin === target.origin &&
    /^\/[a-z0-9]+\/view$/iu.test(url.pathname)
  );
}

async function waitForCount(collection, expected, label) {
  const deadline = Date.now() + 10_000;
  while (collection.length < expected && Date.now() < deadline) {
    await delay(100);
  }
  assert.equal(collection.length, expected, label);
}

function attachNetworkAudit(page) {
  const loaderUrls = [];
  const viewRequests = [];
  const viewResponses = [];
  const sameOriginSetCookies = [];
  const headerChecks = [];

  page.on('request', (request) => {
    if (isAnalyticsLoader(request.url())) loaderUrls.push(request.url());
    if (isAnalyticsView(request)) {
      viewRequests.push({
        body: request.postData() ?? '',
        url: request.url(),
      });
    }
  });

  page.on('response', (response) => {
    const responseUrl = new URL(response.url());
    if (isAnalyticsView(response.request())) {
      viewResponses.push({ status: response.status(), url: response.url() });
    }
    if (responseUrl.origin === target.origin) {
      headerChecks.push(
        response.allHeaders().then((headers) => {
          if (headers['set-cookie']) {
            sameOriginSetCookies.push({
              header: headers['set-cookie'],
              url: response.url(),
            });
          }
        }),
      );
    }
  });

  return {
    headerChecks,
    loaderUrls,
    sameOriginSetCookies,
    viewRequests,
    viewResponses,
  };
}

function assertSafePayload(rawBody) {
  const payload = JSON.parse(rawBody);
  assert.deepEqual(
    Object.keys(payload).sort(),
    [...allowedPayloadKeys].sort(),
    'O payload contém propriedade fora do contrato aprovado.',
  );
  assert.equal(payload.dp, '/', 'O caminho enviado deve ser somente /.');
  assert.equal(
    payload.o,
    `${target.origin}/`,
    'A origem enviada deve ser canônica e sem parâmetros.',
  );
  assert.equal(payload.r, '', 'O referrer deve ser removido do payload aprovado.');
  for (const marker of sensitiveMarkers) {
    assert.equal(
      rawBody.toLowerCase().includes(marker.toLowerCase()),
      false,
      `O payload expôs o marcador sensível ${marker}.`,
    );
  }
  assert.equal(rawBody.includes('?'), false, 'O payload não deve conter query.');
  assert.equal(rawBody.includes('#'), false, 'O payload não deve conter fragmento.');
  return payload;
}

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-blink-features=AutomationControlled'],
});
const context = await browser.newContext({
  locale: 'pt-BR',
  timezoneId: 'America/Sao_Paulo',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  viewport: { height: 900, width: 1440 },
});

try {
  const homePage = await context.newPage();
  const homeAudit = attachNetworkAudit(homePage);
  const sensitiveUrl = new URL('/', target);
  sensitiveUrl.searchParams.set('email', sensitiveMarkers[0]);
  sensitiveUrl.searchParams.set('utm_source', sensitiveMarkers[1]);
  sensitiveUrl.hash = sensitiveMarkers[2];

  const firstResponse = await homePage.goto(sensitiveUrl.href, {
    waitUntil: 'networkidle',
  });
  assert.equal(firstResponse?.status(), 200, 'A home deve responder HTTP 200.');
  await waitForCount(
    homeAudit.viewRequests,
    1,
    'Cada carregamento deve emitir exatamente um pageview.',
  );
  await waitForCount(
    homeAudit.viewResponses,
    1,
    'O primeiro pageview deve receber uma única resposta.',
  );
  assertSafePayload(homeAudit.viewRequests[0].body);
  assert.equal(homeAudit.viewResponses[0].status, 200, 'O endpoint /view deve responder 200.');

  await homePage.reload({ waitUntil: 'networkidle' });
  await waitForCount(
    homeAudit.viewRequests,
    2,
    'Um reload deve acrescentar exatamente um pageview, sem duplicidade.',
  );
  await waitForCount(
    homeAudit.viewResponses,
    2,
    'O reload deve receber uma única resposta adicional.',
  );
  assertSafePayload(homeAudit.viewRequests[1].body);
  assert.equal(homeAudit.viewResponses[1].status, 200, 'O segundo /view deve responder 200.');
  assert.equal(homeAudit.loaderUrls.length, 2, 'Cada carregamento deve solicitar um loader.');

  const browserStorage = await homePage.evaluate(() => ({
    localStorage: Object.keys(globalThis.localStorage),
    sessionStorage: Object.keys(globalThis.sessionStorage),
  }));
  assert.deepEqual(browserStorage, { localStorage: [], sessionStorage: [] });
  assert.deepEqual(await context.cookies(target.origin), [], 'A landing não deve criar cookies.');

  const excludedResults = [];
  for (const route of excludedRoutes) {
    const page = await context.newPage();
    const audit = attachNetworkAudit(page);
    const response = await page.goto(new URL(route, target).href, {
      waitUntil: 'networkidle',
    });
    await delay(500);
    assert.equal(audit.loaderUrls.length, 0, `${route} não deve carregar o loader.`);
    assert.equal(audit.viewRequests.length, 0, `${route} não deve enviar pageview.`);
    excludedResults.push({ route, status: response?.status() ?? null });
    await Promise.all(audit.headerChecks);
    assert.deepEqual(audit.sameOriginSetCookies, [], `${route} não deve definir cookie.`);
    await page.close();
  }

  const loaderUrl = homeAudit.loaderUrls[0];
  assert(loaderUrl, 'O loader de produção deve ser observável na home.');
  const blockerPage = await context.newPage();
  const blockerAudit = attachNetworkAudit(blockerPage);
  await blockerPage.route(loaderUrl, (route) => route.abort('blockedbyclient'));
  const blockerResponse = await blockerPage.goto(target.href, { waitUntil: 'networkidle' });
  assert.equal(blockerResponse?.status(), 200, 'A home deve abrir quando o loader é bloqueado.');
  await delay(500);
  assert.equal(blockerAudit.viewRequests.length, 0, 'Loader bloqueado não deve gerar /view.');
  await blockerPage.locator('[data-faq-id] summary').first().click();
  assert.equal(
    await blockerPage.locator('[data-faq-id]').first().getAttribute('open'),
    '',
    'A FAQ deve continuar interativa quando o loader é bloqueado.',
  );
  const signupLink = blockerPage
    .locator('a[data-app-link][data-destination-type="signup"]')
    .first();
  assert.equal(await signupLink.isVisible(), true, 'O CTA deve permanecer visível.');
  assert.match(
    await signupLink.getAttribute('href'),
    /^https:\/\/[^/]+\/cadastro/u,
    'O CTA deve manter um destino funcional.',
  );

  await Promise.all([...homeAudit.headerChecks, ...blockerAudit.headerChecks]);
  assert.deepEqual(homeAudit.sameOriginSetCookies, [], 'Produção não deve definir Set-Cookie.');
  assert.deepEqual(blockerAudit.sameOriginSetCookies, [], 'O bloqueio não deve criar cookie.');

  console.log(
    JSON.stringify(
      {
        blocker: {
          ctaVisible: true,
          faqInteractive: true,
          pageviews: blockerAudit.viewRequests.length,
          status: blockerResponse?.status() ?? null,
        },
        browserStorage,
        cookies: 0,
        excludedRoutes: excludedResults,
        home: {
          loaderRequests: homeAudit.loaderUrls.length,
          pageviewResponses: homeAudit.viewResponses.map(({ status }) => status),
          pageviews: homeAudit.viewRequests.length,
          payloadKeys: Object.keys(JSON.parse(homeAudit.viewRequests[0].body)).sort(),
          sanitizedPath: '/',
        },
        target: target.origin,
      },
      null,
      2,
    ),
  );
} finally {
  await context.close();
  await browser.close();
}
