import auth from "@/config/config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";
import { NextRouter, Router, useRouter } from "next/router";

export const signInEmail = async (
  email: string,
  pass: string,
  router: NextRouter
) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      router.push("/components/home");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " Error code");
      console.log(errorMessage + " Error message");
    });
};

export const signInWithGoogle = async (router: NextRouter) => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((response) => {
      console.log(response);
      router.push("/components/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const signInWithGithub = async (router: NextRouter) => {
  signInWithPopup(auth, new GithubAuthProvider())
    .then((response) => {
      console.log(response);
      router.push("/components/home");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInWithFacebook = async (router: NextRouter) => {
  signInWithPopup(auth, new FacebookAuthProvider())
    .then((response) => {
      console.log(response);
      router.push("/components/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
