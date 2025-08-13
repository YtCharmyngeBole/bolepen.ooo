let mediaPrintEventsInitialized = false;

/**
 * Initializes a pair of custom events describing when the "print" media query
 * is attached to or detached from the "window" global object.
 * - The "mediaprintstart" event is dispatched when the user
 *   toggles the print preview or is about to print the page.
 * - The "mediaprintend" event is dispatched when the user
 *   untoggles the print preview or is done printing the page.
 */
export function initMediaPrintEvents(): void {
  if (mediaPrintEventsInitialized) return;
  if (!window.matchMedia) return;

  const mediaQueryList: MediaQueryList = window.matchMedia("print");
  mediaQueryList.addEventListener("change", (mql: MediaQueryListEvent) => {
    if (mql.matches) {
      window.dispatchEvent(new CustomEvent("mediaprintstart"));
    } else {
      window.dispatchEvent(new CustomEvent("mediaprintend"));
    }
  });

  mediaPrintEventsInitialized = true;
}

// Attempts to auto-register the custom events
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMediaPrintEvents);
} else {
  initMediaPrintEvents();
}
