export { metadata } from "@/meta/metadata";
export { viewport } from "@/meta/viewport";
import { Loading } from "@/components/Loading";
import { roboto, rokkitt } from "@/styles/fonts";
import "@/styles/globals.css";
import { ReactNode, Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${rokkitt.variable}`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
