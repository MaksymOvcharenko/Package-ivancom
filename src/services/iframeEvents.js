/* eslint-disable no-unused-vars */
// Разрешённый origin родителя (ОБЯЗАТЕЛЬНО замени!)
// ЗАМІНИ на фактичний домен головного сайту
const PARENT_ORIGIN = "https://www.ivancom.eu";

export function sendToParent(event, props = {}) {
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        { source: "inpost-form", type: "GTM_EVENT", event, props },
        PARENT_ORIGIN // у проді НЕ '*'
      );
    }
  } catch (e) {
    // optional: console.warn("postMessage error", e);
  }
}
