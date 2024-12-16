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

  const copyToClipboard = async (data: string | ClipboardItem) => {
    try {
      const clipboardItem =
        typeof data === "string"
          ? [
              new ClipboardItem({
                "text/plain": new Blob([data], { type: "text/plain" }),
              }),
            ]
          : [data];
      await navigator.clipboard.write(clipboardItem);
      displayMessage("Copied to clipboard!");
    } catch (error) {
      if ((error as Error).name === "NotAllowedError") {
        displayMessage(
          "Clipboard access denied; cannot copy. Try downloading instead.",
        );
        return;
      }
      console.error("Failed to copy text to clipboard:", error);
      displayMessage("Failed to copy to clipboard.");
    }
  };

  return { copyToClipboard, displayMessage, message, hasMessage: showMessage };
};
