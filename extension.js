/* eslint-disable global-require */
const nodecgAPIContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {
  // Store a reference to this NodeCG API context in a place where other libs can easily access it.
  // This must be done before any other files are `require`d.
  nodecgAPIContext.set(nodecg);

  nodecg.Replicant('toasterSettings', 'nodecg-toaster', {
    defaultValue: {
      enabled: true,
    },
  });
  const toastsRep = nodecg.Replicant('toasts', 'nodecg-toaster', {
    defaultValue: [],
  });
  const DELAY_MS = nodecg.bundleConfig.delaySeconds * 1000;
  const HOLD_MS = nodecg.bundleConfig.holdSeconds * 1000;
  let currentToastIndex = 0;
  let liveToasts = [];

  function updateToasts() {
    const toasts = toastsRep.value;
    liveToasts = toasts.filter((toast) => toast.live === true);
  }

  async function displayNextToast() {
    const liveToastsLength = liveToasts.length - 1;
    nodecg.sendMessage('displayToast', liveToasts[currentToastIndex]);
    await new Promise((r) => setTimeout(r, HOLD_MS));
    nodecg.sendMessage('hideToast');

    // If we're at the end of the list, reload and start from the top
    if (currentToastIndex >= liveToastsLength) {
      currentToastIndex = 0;
      updateToasts();
    } else {
      currentToastIndex += 1;
    }
  }

  // Start the loop
  setInterval(displayNextToast, DELAY_MS + HOLD_MS);
};
