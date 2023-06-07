import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { NextRouter } from "next/router";
import auth from "../config/config";

export const useGoogleAuth = async (router: NextRouter) => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((response) => {
      console.log(response);
      router.push("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const useGithubAuth = async (router: NextRouter) => {
  signInWithPopup(auth, new GithubAuthProvider())
    .then((response) => {
      console.log(response);
      router.push("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const useFacebookAuth = async (router: NextRouter) => {
  signInWithPopup(auth, new FacebookAuthProvider())
    .then((response) => {
      console.log(response);
      router.push("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
