import { ReactNode } from "react";
import { Header } from "./components/Header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative h-lvh">
      <Header />
      <div className="py-[56px] h-[100%]">{children}</div>
    </div>
  );
}
