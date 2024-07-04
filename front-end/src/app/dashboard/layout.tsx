import { ReactNode } from "react";
import { Header } from "./components/Header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  );
}
