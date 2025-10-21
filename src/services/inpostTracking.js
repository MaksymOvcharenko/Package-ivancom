import { sendToParent } from "./iframeEvents.js";


export function trackFormInpostOpen(extra = {}) {
  sendToParent("form_inpost_open", { form: "inpost", ...extra });
}

export function trackFormInpostSubmit(extra = {}) {
  sendToParent("form_inpost_submit", { form: "inpost", ...extra });
}
