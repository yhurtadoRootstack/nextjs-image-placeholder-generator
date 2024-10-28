"use server";
import axios from "axios";
import sharp from "sharp";

export async function convert(prevState: string | null, formData: FormData) {
  console.log({
    file: formData.get("file"),
    type: formData.get("type"),
    prevState,
  });

  if (!formData.get("file")) return null;

  const inputType = formData.get("type");
  const factor = parseInt(formData.get("factor") as string);

  let buffer: ArrayBuffer;

  if (inputType === "file") {
    const file = formData.get("file") as File;
    if (file.size === 0) throw "no se selecciono un archivo";
    buffer = await file.arrayBuffer();
  } else {
    const url = formData.get("file") as string;
    if (!url) throw "no se selecciono un archivo";

    buffer = (
      await axios({
        url,
        responseType: "arraybuffer",
      })
    ).data as ArrayBuffer;
  }

  const metadata = await sharp(buffer).metadata();

  const newW = metadata.width
    ? Math.round((metadata.width / 100) * factor)
    : 30;

  console.log(newW);
  const res = await sharp(buffer).resize(newW).webp().toBuffer();

  const base64 = Buffer.from(res).toString("base64");

  return `data:image/webp;base64,${base64}`;
}
