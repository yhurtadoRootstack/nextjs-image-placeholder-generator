"use client";

import { convert } from "@/app/actions";
import { useCallback, useRef, useState } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const submit = useCallback(async () => {
    setPending(true);
    if (formRef.current) {
      const result = await convert(new FormData(formRef.current));

      if (result) setResult(result);
    }
    setPending(false);
  }, []);

  return (
    <form className="w-full gap-8 flex flex-col" ref={formRef}>
      <input type="hidden" value={type} name="type" />
      <div className="w-full">
        <ToggleGroup
          disabled={pending}
          type="single"
          value={type}
          onValueChange={(value: FileType) => {
            if (value) setType(value);
          }}
          defaultValue="file"
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
        <Input
          disabled={pending}
          type={FileTypeMap[type]}
          className="w-full"
          name="file"
          onChange={submit}
        />
      </div>

      <div className="flex gap-2 items-center">
        <span className="font-mono w-[80px]">escala:</span>
        <div className="flex-1">
          <Slider
            disabled={pending}
            defaultValue={[15]}
            max={100}
            step={1}
            min={1}
            name="factor"
            onValueCommit={submit}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-mono w-[80px]">blur: </span>
        <div className="flex-1">
          <Slider
            disabled={pending}
            defaultValue={[5]}
            max={100}
            step={1}
            min={1}
            name="blur"
            onValueCommit={submit}
          />
        </div>
      </div>
      {result && (
        <div className="w-full flex flex-col gap-4">
          <span>Resultado: </span>
          <div className="relative h-56">
            <Image
              alt="imagen generada"
              fill
              src={result}
              objectFit="contain"
            />
          </div>

          <p className="break-all text-wrap bg-muted font-mono text-sm font-semibold">
            {result}
          </p>

          <Button
            type="button"
            onClick={() => navigator.clipboard.writeText(result)}
          >
            copiar <CopyIcon />
          </Button>
        </div>
      )}
    </form>
  );
}
