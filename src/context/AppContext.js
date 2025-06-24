"use client";
import { createContext, useState, useEffect, useRef } from "react";
import { auth, db } from "@/app/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import chatbotService from "@/services/chatbotService";
import profileService from "@/services/profileService";
import configurationService from "@/services/configurationService";

export const AppContext = createContext();

const assistantId = process.env.NEXT_PUBLIC_DOMAIN_ID;

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [configuration, setConfiguration] = useState();
  const [user, setUser] = useState(null);
  const [userCredits, setUserCredits] = useState();
  const [sessions, setSessions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [configLoader, setConfigLoader] = useState(true);
  const [activeSession, setActiveSession] = useState(null);
  const [promptChain, setPromptChain] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [llm, setLlm] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    const fetchConfiguration = async () => {
      await configurationService.fetchAssistantConfiguration(
        assistantId,
        setConfiguration,
        setConfigLoader,
        setLlm,
        setModel,
      );
    };
    fetchConfiguration();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const querySnapshotNew = await getDocs(
          query(
            collection(db, "userdata"),
            where("email", "==", currentUser.email),
          ),
        );
        if (!querySnapshotNew.empty) {
          setLoader(false);
          const userData = querySnapshotNew.docs[0].data();
          setUserCredits(userData.credits);
        }
        await configurationService.fetchActivePromptDetails(
          assistantId,
          setPromptChain,
        );
        await profileService.fetchUserProfile(
          assistantId,
          currentUser,
          setUserProfile,
        );
      } else {
        setUser(null);
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const reduceCredits = async (n) => {
    const querySnapshotNew = await getDocs(
      query(collection(db, "userdata"), where("email", "==", user.email)),
    );
    const documentRef = doc(db, "userdata", querySnapshotNew.docs[0].id);
    updateDoc(documentRef, {
      credits: userCredits - n,
    });
    setUserCredits((prev) => prev - n);
  };

  const handleSignOut = (e) => {
    e.preventDefault();

    auth
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  const sessionsFetchedRef = useRef(false);

  useEffect(() => {
    if (
      assistantId &&
      user &&
      sessions.length === 0 &&
      !sessionsFetchedRef.current
    ) {
      sessionsFetchedRef.current = true; // ✅ Prevent future fetches
      chatbotService.fetchSessions(
        assistantId,
        user.email,
        setSessions,
        setLoader,
      );
    }
  }, [assistantId, user]);

  return (
    <AppContext.Provider
      value={{
        assistantId,
        configuration,
        configLoader,
        user,
        userCredits,
        loader,
        sessions,
        setSessions,
        activeSession,
        setActiveSession,
        llm,
        model,
        promptChain,
        userProfile,
        reduceCredits,
        handleSignOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
