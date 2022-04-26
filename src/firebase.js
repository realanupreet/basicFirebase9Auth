import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCBQ4dRltyhDtsJhrAw1Ax92TV8RCTWm5w",
  authDomain: "notevenlinkedin.firebaseapp.com",
  projectId: "notevenlinkedin",
  storageBucket: "notevenlinkedin.appspot.com",
  messagingSenderId: "517129053798",
  appId: "1:517129053798:web:7c8dafc5e2710a2d44efa7",
  measurementId: "G-51QQ8YD5CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signout = () => {
  return signOut(auth);
};
export function useAuth() {
  const [currentuser, setCurrentuser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentuser(user);
    });
    return unsub;
  }, []);
  return currentuser;
}
///
///
///
///
///
export async function upload(file, currentuser, setLoading) {
  const fileRef = ref(storage, currentuser.uid + ".png");
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);
  console.log("photourl", photoURL);
  updateProfile(currentuser, { photoURL: photoURL });
  setLoading(false);
  alert("file uploaded");
}
