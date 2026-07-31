import { ptBRHomeContent } from '../i18n/content/pt-BR.ts';
import { getHomeAnchorHref } from '../i18n/routes.ts';

export interface NavigationItem {
  readonly href: `#${string}`;
  readonly label: string;
}

export const primaryNavigation = Object.freeze(
  ptBRHomeContent.header.navigation.map((item): NavigationItem => ({
    href: getHomeAnchorHref('pt-BR', item.anchor),
    label: item.label,
  })),
);

export const headerContent = Object.freeze({
  loginLabel: ptBRHomeContent.header.loginLabel,
  signupLabel: ptBRHomeContent.header.signupLabel,
});
