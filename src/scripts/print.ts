type PrintEventCallback = () => void;

interface PrintEventListenerOptions {
  onPrintStart?: PrintEventCallback;
  onPrintEnd?: PrintEventCallback;
}

export function addPrintEventListener(
  options: PrintEventListenerOptions = {},
): void {
  if (window.matchMedia) {
    const mediaQueryList: MediaQueryList = window.matchMedia("print");
    mediaQueryList.addEventListener("change", (mql: MediaQueryListEvent) => {
      if (mql.matches) {
        // The document is being printed
        options.onPrintStart?.();
      } else {
        // The document is no longer being printed
        options.onPrintEnd?.();
      }
    });
  }
}
