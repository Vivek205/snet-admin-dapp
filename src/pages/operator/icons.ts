export const ICONS: ICONS = {
  ratelimit: "fas fa-greater-than-equal",
  general: "fas fa-sliders-h",
  logging: "fas fa-book",
  certificate: "fas fa-suitcase",
  blockchain: "fab fa-bitcoin",
  default: "fab fa-intercom",
  tooltipInfo: "fas fa-info-circle",
  start: "fas fa-play-circle",
  stop: "fas fa-stop-circle",
  warning: "fas fa-exclamation"
};

interface ICONS {
  ratelimit: string;
  general: string;
  logging: string;
  certificate: string;
  blockchain: string;
  default: string;
  tooltipInfo: string;
  start: string;
  stop: string;
  warning: string;
  [key: string]: string;
}
