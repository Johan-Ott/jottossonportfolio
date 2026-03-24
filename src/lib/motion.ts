export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  outSmooth: [0.33, 1, 0.68, 1] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  reveal: 0.5,
};

export const stagger = {
  tight: 0.03,
  normal: 0.06,
  wide: 0.1,
};
