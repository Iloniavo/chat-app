import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import auth from "@/config/config";
import { useStore } from "@/utils/useStore";

export default function home() {
  const router = useRouter();

  const { name, setName, picUrl, setPicUrl } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user?.displayName && user.photoURL) {
        setName(user.displayName);
        setPicUrl(user.photoURL);
      } else if (user?.email) {
        setName(user.email);
      } else {
        router.push("/components/login");
      }
    });
    return unsubscribe;
  });

  const logOut = () => {
    signOut(auth);
    router.push("/components/login");
  };

  return (
    <div className="home">
      <div className="picture">
        <img src={picUrl} alt="Alt" />
      </div>

      <p
        style={{
          margin: "20px auto",
        }}
      >
        Welcome {name}
      </p>
      <div
        style={{
          width: "80%",
          margin: "auto",
        }}
      >
        <Button onClick={(): void => logOut()} variant="contained">
          Sign out
        </Button>
      </div>
    </div>
  );
}
