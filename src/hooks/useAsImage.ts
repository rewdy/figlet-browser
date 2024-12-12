import html2canvas from "html2canvas";

export const useAsImage = () => {
  const downloadAsImage = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = data;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyAsImageToClipboard = async (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element);
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      }
    }, "image/png");
  };

  return { downloadAsImage, copyAsImageToClipboard };
};
