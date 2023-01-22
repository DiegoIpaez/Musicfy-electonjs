import { auth } from "./utils/firebase";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoggedLayout from './layout/LoggedLayout'

import Auth from "./pages/Auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (currentUser) => {
    currentUser?.emailVerified === false ? setUser(null) : setUser(currentUser);
    setLoading(false);
  });

  if (loading) {
    return null;
  }
  
  const logout = () => signOut(auth);

  return <>
   {!user ? <Auth /> : <LoggedLayout user={user} logout={logout}/>}
   <ToastContainer 
     position="top-center"
     autoClose={5000}
     pauseOnHover={false}
     rtl={false}
     hideProgressBar
     newestOnTop
     closeOnClick
     draggable
   /> 
  </>;
}
