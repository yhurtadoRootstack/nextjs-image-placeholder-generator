"use server";
import axios from "axios";
import sharp from "sharp";

async function generate(buffer: ArrayBuffer, factor: number, blur: number) {
  const metadata = await sharp(buffer).metadata();

  const width = metadata.width
    ? Math.round((metadata.width / 100) * factor)
    : 30;

  const webp = sharp(buffer).resize({ width }).blur(blur).webp({ quality: 30 });

  const res = await webp.toBuffer();
  const base64 = Buffer.from(res).toString("base64");

  return `data:image/webp;base64,${base64}`;
}

export async function convert(formData: FormData): Promise<string | null> {
  if (!formData.get("file")) return null;

  const inputType = formData.get("type");
  const factor = parseInt(formData.get("factor") as string);
  const blur = parseInt(formData.get("blur") as string);

  let buffer: ArrayBuffer;

  if (inputType === "file") {
    const file = formData.get("file") as File;
    if (file.size === 0) return null;
    buffer = await file.arrayBuffer();
  } else {
    const url = formData.get("file") as string;
    if (!url) return null;

    buffer = (
      await axios({
        url,
        responseType: "arraybuffer",
      })
    ).data as ArrayBuffer;
  }

  const base64 = await generate(buffer, factor, blur);

  return base64;
}
