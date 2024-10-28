"use client";

import { convert } from "@/app/actions";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Button } from "./ui/button";
import Image from "next/image";
import { CopyIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type FileType = "file" | "url";

const FileTypeMap: Record<FileType, string> = {
  file: "file",
  url: "text",
};

export default function UploadForm() {
  const [type, setType] = useState<FileType>("file");
  const [factor, setFactor] = useState<number[]>([15]);
  const [state, formAction] = useActionState(convert, null);

  console.log({ state });
  return (
    <form className="w-full gap-8 flex flex-col" action={formAction}>
      <input type="hidden" value={type} name="type" />
      <div className="w-full">
        <ToggleGroup
          type="single"
          value={type}
          onValueChange={(value: FileType) => setType(value)}
        >
          <ToggleGroupItem value="file" name="type">
            Archivo
          </ToggleGroupItem>
          <ToggleGroupItem value="url" name="type">
            Url
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex w-full gap-2">
        <Input type={FileTypeMap[type]} className="w-full" name="file"></Input>
        <Button type="submit">Convertir</Button>
      </div>

      <div className="flex gap-2">
        <span className="font-mono w-[60px]">{factor[0]} %</span>
        <Slider
          defaultValue={factor}
          onValueChange={(value) => setFactor(value)}
          max={100}
          step={1}
          min={1}
          name="factor"
        />
      </div>
      {state && (
        <div className="w-full flex flex-col gap-4">
          <span>Resultado: </span>
          <div className="relative h-56">
            <Image
              alt="imagen generada"
              fill
              src={state}
              style={{ objectFit: "contain" }}
            />
          </div>

          <p className="break-all text-wrap bg-muted font-mono text-sm font-semibold">
            {state}
          </p>

          <Button
            type="button"
            onClick={() => navigator.clipboard.writeText(state)}
          >
            copiar <CopyIcon />
          </Button>
        </div>
      )}
    </form>
  );
}
