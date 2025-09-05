"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useKeycloak from "@/hooks/useKeycloak";

export default function HomePage() {
  const { isLogin } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.replace("/pt");
    } 
  }, [isLogin, router]);

  return null;
}
