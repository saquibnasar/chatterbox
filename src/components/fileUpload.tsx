"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";
// import { Uploader } from "@uploadthing/solid";
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import type { OurFileRouter } from "@/server/uploadthing";
import { X } from "lucide-react";
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
  if ((value && fileTYpe) !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full " />
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
  return (
    <>
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
