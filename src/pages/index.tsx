import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Loader } from "../components";
import { isAuthenticated } from "../hooks/useGetAuthUserInfo";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    return () => {
      isAuthenticated() ? router.push("/profile") : router.push("/login");
    };
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      {" "}
      <Loader />{" "}
    </div>
  );
}
