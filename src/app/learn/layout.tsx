import React from "react";
import "./doc-reader.css";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="doc-learn-root min-h-screen bg-background">{children}</div>;
}
