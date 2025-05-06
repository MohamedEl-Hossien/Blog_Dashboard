import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function getAuthToken() {
  const token = localStorage.getItem("firebaseToken");

  if (!token) {
    return null;
  }

  return token;
}

export const signUp = async ({ data }) => {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
};

export const logIn = async ({ data }) => {
  return signInWithEmailAndPassword(auth, data.email, data.password);
};

export const logOut = () => {
  return auth.signOut();
};
