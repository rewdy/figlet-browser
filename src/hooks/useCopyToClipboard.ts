import { useState } from "react";

export const useCopyToClipboard = (messageDuration = 2000) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const displayMessage = (text: string) => {
    setMessage(text);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, messageDuration);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      displayMessage("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      displayMessage("Failed to copy to clipboard.");
    }
  };

  return { copyToClipboard, message, showMessage };
};
