"use client";
import { createContext, useState, useEffect } from "react";
import { auth, db } from "@/app/firebase"; // Import Firestore
import { doc, getDoc } from "firebase/firestore";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setLoader(true);
      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch authorized users list from Firestore
          const docRef = doc(db, "daynightcricket", "authorized");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.users && data.users.includes(currentUser.email)) {
              setAuthorized(true);
            } else {
              setAuthorized(false);
            }
          } else {
            setAuthorized(false);
          }
        } catch (error) {
          console.error("Error fetching authorization data:", error);
          setAuthorized(false);
        }

        setLoader(false);
      } else {
        setUser(null);
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loader,
        authorized, // Provide authorized state
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
