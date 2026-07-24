const sharedMaximums = {
  cls: 0.1,
  imageBytes: 50_000,
  lcpMs: 2_500,
  requestCount: 25,
  scriptBytes: 10_000,
  stylesheetBytes: 40_000,
  tbtMs: 200,
  totalBytes: 200_000,
};

export const performanceBudget = Object.freeze({
  mobile: Object.freeze({
    minimums: Object.freeze({ performanceScore: 95 }),
    maximums: Object.freeze({ ...sharedMaximums }),
  }),
  desktop: Object.freeze({
    minimums: Object.freeze({ performanceScore: 95 }),
    maximums: Object.freeze({ ...sharedMaximums }),
  }),
});
