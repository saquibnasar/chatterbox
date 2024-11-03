"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
type FileUploadProps = {
  onChange: (url: string) => void;
  value: string;
  endPoint: "messageFile" | "serverImage";
};
export default function FileUpload({
  onChange,
  value,
  endPoint,
}: FileUploadProps) {
  const fileTYpe = value.split(".").pop();

  if (value && fileTYpe !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="upload"
          className="rounded-full"
          priority
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileTYpe === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <>
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          console.log("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
