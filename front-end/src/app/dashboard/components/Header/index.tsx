"use client";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

export const Header = () => {
  const { trigger } = useSWRMutation("/api/test", fetcher("GET"));
  const router = useRouter();

  const logout = async () => {
    await trigger();
    router.replace("/login");
  };

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-end p-4">
      <span onClick={logout} className="cursor-pointer">
        Logout
      </span>
    </div>
  );
};
