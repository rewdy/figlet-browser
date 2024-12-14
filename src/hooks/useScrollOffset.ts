import { useState, useEffect } from "react";

/**
 * Use window scroll offset. Debounced to prevent excessive updates.
 *
 * @param debounceDelay Milliseconds to wait before updating the scroll offset. Defaults to 250.
 * @returns number scroll offset
 */
function useScrollOffset(debounceDelay = 250) {
  const [scrollOffset, setScrollOffset] = useState(window.scrollY);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setScrollOffset(window.scrollY);
      }, debounceDelay);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener and timeout on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [debounceDelay]);

  return scrollOffset;
}

export default useScrollOffset;
