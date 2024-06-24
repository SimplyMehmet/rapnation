import { RedirectType, redirect } from "next/navigation";

export default function page() {
  redirect("/login", RedirectType.replace);
}
