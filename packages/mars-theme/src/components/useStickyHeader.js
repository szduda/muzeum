import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useStickyHeader = (ref, actions, state) => {
  const handleScroll = () => {
    if (ref.current) {
      if (ref.current.getBoundingClientRect().top <= 100)
        actions.theme.setSticky();
      else actions.theme.unsetSticky();
    }
  };

  const debouncedHandleScroll = useDebouncedCallback(handleScroll, 100);

  useEffect(() => {
    handleScroll();

    const root = document.querySelector("#root");
    root.addEventListener("scroll", debouncedHandleScroll);
    return () =>
      root.removeEventListener("scroll", () => debouncedHandleScroll);
  }, [state.router.link]);

  return state.theme.isHeaderSticky;
};

export default useStickyHeader;
