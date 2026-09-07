import React from "react";
import { Metadata } from "next";
import { loadSection04Content } from "@/lib/docs/content";
import { DocReaderLayout } from "@/components/docs/doc-reader-layout";

export const metadata: Metadata = {
  title: "Section 04 — Input & Output",
  description:
    "Learn how Python programs accept user input, handle data types, and produce formatted output using input(), int(), float(), and f-strings.",
};

export default function Section04Page() {
  const chapter = loadSection04Content();

  return <DocReaderLayout chapter={chapter} />;
}
