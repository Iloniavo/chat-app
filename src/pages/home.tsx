import { useRouter } from "next/router";
import React from "react";
import { useEffect} from "react";
import { Button } from "@mui/material";

import { useGetAuthUserInfo } from "../hooks/useGetAuthUserInfo";
import { useLoginStore } from "../hooks";

export default function home() {
  const router = useRouter();

  const { name, setName, picUrl } = useLoginStore();

  useEffect(() => {
    return () => {
      useGetAuthUserInfo() ? setName(useGetAuthUserInfo().name) : "";
    };
  }, []);

  const logOut = () => {
    router.push("/login").then((r) => console.log("Success"));
    localStorage.clear();
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
