export function pushGtmEvent(event, props = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props });
}


// опційний репост подій у батьківський сайт (де вставлено <iframe>)
function postToParent(event, props) {
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        { source: "inpost-form", type: "GTM_EVENT", event, props },
        "*" // за бажанням вкажи конкретний origin
      );
    }
  // eslint-disable-next-line no-unused-vars, no-empty
  } catch (e) {}
}

function fire(event, props = {}) {
  pushGtmEvent(event, props);   // локально (всередині айфрейма)
  postToParent(event, props);   // наверх (опційно)
}

export function trackFormInpostOpen(extra = {}) {
  fire("form_inpost_open", { form: "inpost", ...extra });
}

export function trackFormInpostSubmit(extra = {}) {
  fire("form_inpost_submit", { form: "inpost", ...extra });
}
