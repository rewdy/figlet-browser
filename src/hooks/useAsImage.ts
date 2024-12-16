const PNG_DOC_STRING = "image/png";

export const useAsImage = () => {
  const downloadAsImage = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL(PNG_DOC_STRING);
    const link = document.createElement("a");

    link.href = data;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getImageAsPngBlob = async (elementId: string): Promise<Blob> => {
    const html2canvas = (await import("html2canvas")).default;

    return new Promise((resolve, reject) => {
      const element = document.getElementById(elementId);
      if (!element) {
        reject(
          new Error(`Could not find element in page with id: ${elementId}`)
        );
        return;
      }

      html2canvas(element).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not convert canvas to blob"));
          }
        }, PNG_DOC_STRING);
      });
    });
  };

  return { downloadAsImage, getImageAsPngBlob };
};
