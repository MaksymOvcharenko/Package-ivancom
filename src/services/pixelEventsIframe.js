let ReactPixel = null;

if (typeof window !== "undefined") {
  import("react-facebook-pixel").then((module) => {
    ReactPixel = module.default;

    ReactPixel.init(
      "689234196807365",
      {},
      {
        autoConfig: true,
        debug: false,
        advancedMatching: {},
      }
    );

    ReactPixel.track("PageView"); // автоматичний PageView коли завантажився фрейм
  });
}

const pixelEventsIframe = {
  addToCart: () => {
    ReactPixel?.track("AddToCart");
  },
  initiateCheckout: () => {
    ReactPixel?.track("InitiateCheckout");
  },
  lead: () => {
    ReactPixel?.track("Lead");
  },
  contact: () => {
    ReactPixel?.track("Contact");
  },
};

export default pixelEventsIframe;
