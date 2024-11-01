/**
 * Observer
 * Sets given element data attribute visible=true
 */
export default function Observer(element: Element) {
  // IntersectionObserver callback function
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-visible", "true"); // Add animation class
      } else {
        // entry.target.setAttribute("data-visible", "false"); // Add animation class
      }
    });
  };

  // Observer options
  const observerOptions = {
    threshold: 0.5, // Trigger when 50% of the element is visible
  };

  // Create the observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe the target element
  observer.observe(element);
}
