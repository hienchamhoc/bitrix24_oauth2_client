"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code");
    const domain = searchParams.get("domain");
    const member_id = searchParams.get("member_id");
    const redirect_uri = searchParams.get("redirect_uri");
    const scope = searchParams.get("scope");
    console.log("code", code);
    console.log("domain", domain);
    console.log("member_id", member_id);
    console.log("redirect_uri", redirect_uri);
    console.log("scope", scope);
  }, []);
  return <div>hien</div>;
}
