import auth from "@/config/config";
import { onAuthStateChanged } from "firebase/auth";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "./components/login";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUse) => {
      if (currentUse?.displayName || currentUse?.email) {
        router.push("/components/home");
      } else {
        router.push("/components/login");
      }
    });
    return unsubscribe;
  });
  return <Login />;
}
