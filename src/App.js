import "./styles.css";
import { signup, useAuth, signout, signin } from "./firebase";
import { useRef, useState } from "react";
import Profile from "./Profile";

export default function App() {
  ////
  /////
  ////
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [info, setInfo] = useState("");
  const currentuser = useAuth();
  /////
  ////
  ////
  const handleSignup = async () => {
    setInfo("");
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err.code);
      setInfo(err.code);
      console.log("info :", info);
    }
    setLoading(false);
  };

  const handleSignin = async () => {
    setInfo("");
    setLoading(true);
    try {
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err.code);
      setInfo(err.code);
      console.log("info :", info);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setInfo("");
    try {
      await signout();
    } catch (err) {
      setInfo(err.code);
    }
  };

  return (
    <div className="App">
      <span>currently logged:{currentuser?.email} </span>
      <br />
      <input ref={emailRef} type="text" placeholder="email" />
      <br />
      <input ref={passwordRef} type="password" placeholder="password" />
      <br />

      {!loading && (
        <button disabled={currentuser != null} onClick={handleSignup}>
          Sign Up
        </button>
      )}
      {loading && <button disabled={loading}>loading....</button>}

      {!loading && (
        <button disabled={currentuser != null} onClick={handleSignin}>
          Sign in
        </button>
      )}
      {loading && <button disabled={loading}>loading....</button>}

      <button disabled={currentuser === null} onClick={handleLogout}>
        Log out
      </button>
      <br />
      <p className="info" value={info}>
        {info}
      </p>
      {currentuser && <Profile />}
    </div>
  );
}
