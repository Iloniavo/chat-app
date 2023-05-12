import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../components/Loader";

//TODO: Replace the Login component with a loader component

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    return () => {
      localStorage.getItem("email")
        ? router.push("/home")
        : router.push("/login");
    };
  }, []);
  return <Loader />;
}
