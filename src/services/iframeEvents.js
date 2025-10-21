// Разрешённый origin родителя (ОБЯЗАТЕЛЬНО замени!)
const PARENT_ORIGIN = "https://ivancom.eu";

export function sendToParent(event, props = {}) {
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        { source: "inpost-form", type: "GTM_EVENT", event, props },
        PARENT_ORIGIN // ставь "*" только на время теста
      );
    }
  // eslint-disable-next-line no-empty, no-unused-vars
  } catch (e) {}
}
