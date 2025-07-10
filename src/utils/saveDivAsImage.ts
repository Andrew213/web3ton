import html2canvas from "html2canvas";

async function saveDivCanvas(divId: string, filename: string) {
  try {
    const div = document.getElementById(divId);
    if (!div) {
      throw new Error("Div not found!");
    }

    const images = div.getElementsByTagName("img");
    // eslint-disable-next-line no-restricted-syntax
    for (const img of images) {
      img.crossOrigin = "anonymous";
    }

    const canvas = await html2canvas(div, {
      useCORS: true,
      allowTaint: false,
      scale: 2,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${filename}.png`;
    link.click();
  } catch (error) {
    console.error("Ошибка сохранения изображения:", error);
  }
}

export async function saveDivAsImage(divId: string, filename: string) {
  try {
    const div = document.getElementById(divId);
    if (!div) {
      throw new Error("Div not found!");
    }

    const clonedDiv = div.cloneNode(true) as HTMLElement;
    clonedDiv.style.position = "absolute";
    clonedDiv.style.left = "-9999px";
    document.body.appendChild(clonedDiv);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${clonedDiv.offsetWidth}" height="${clonedDiv.offsetHeight}">
        <foreignObject width="100%" height="100%">
          ${new XMLSerializer().serializeToString(clonedDiv)}
        </foreignObject>
      </svg>
    `;

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.src = url;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Ошибка загрузки SVG"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = clonedDiv.offsetWidth;
    canvas.height = clonedDiv.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Не удалось создать контекст canvas");
    }

    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${filename}.png`;
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(clonedDiv);
  } catch (error) {
    console.error("Ошибка сохранения изображения:", error);
    saveDivCanvas(divId, filename);
  }
}
