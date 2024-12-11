import { useRef, useState } from "react";

export const useModalState = (initial: boolean, duration = 500) => {
  const [state, setState] = useState(initial);
  const inTransition = useRef(false);

  const htmlTag = document.querySelector("html");

  const set = (value: boolean) => {
    if (inTransition.current) return; // no op if in transition
    if (value) {
      inTransition.current = true;
      setState(value);
      htmlTag?.classList.add("modal-is-open", "modal-is-opening");
      setTimeout(() => {
        htmlTag?.classList.remove("modal-is-opening");
        inTransition.current = false;
      }, duration);
    } else {
      inTransition.current = true;
      htmlTag?.classList.add("modal-is-closing");
      setTimeout(() => {
        setState(value);
        htmlTag?.classList.remove("modal-is-open", "modal-is-closing");
        inTransition.current = false;
      }, duration);
    }
  };

  return { isOpen: state, setIsOpen: set };
};
