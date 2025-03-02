"use client";
import { Footer } from "app/components/Navigation/Footer";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import { User } from "app/types";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { auth, db } from "app/firebase/firebase";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [newUserName, setNewUserName] = useState("");

  function navigateToProfile() {
    if (!auth.currentUser) return;

    router.push("/profile/" + auth.currentUser.uid);
  }

  function onSave() {
    if (!auth.currentUser) return;

    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        updateFirestoreUser(auth.currentUser!.uid);
        initSettingsForm();
      })
      .catch((err) => {
        console.error("Error while updating profile:", err);
      });
  }

  const updateFirestoreUser = async (id: string) => {
    const userSnap = doc(db, "users", id);
    await updateDoc(userSnap, { name, bio });

    onProfileSaved();
  };

  // trigger name change in navbar
  const onProfileSaved = () => {
    setNewUserName(name);
  };

  const initSettingsForm = async () => {
    if (!auth.currentUser) return;

    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (userDoc.exists()) {
      const user = userDoc.data() as User;
      setName(user.name);
      setBio(user.bio);
    }
  };

  useEffect(() => {
    initSettingsForm();
  }, [auth.currentUser, auth]);

  return (
    <>
      <LayoutNavbar newUserName={newUserName} />
      <div className="flex min-h-[80vh] flex-col items-center justify-start py-5 md:mx-auto md:my-0 md:w-[950px]">
        <h1 className="text-sh-grey text-center text-3xl">Settings</h1>

        <form className="flex w-1/2 flex-col gap-6">
          <fieldset className="w-full">
            <legend className="border-b-grey text-sh-grey mb-3 w-full cursor-default border-b border-solid text-base">
              Change your username
            </legend>
            <input
              value={name}
              type="text"
              className="w-full rounded-md p-2 text-lg outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="w-full">
            <legend className="border-b-grey text-sh-grey mb-3 w-full cursor-default border-b border-solid text-base">
              Change your bio
            </legend>

            <textarea
              value={bio}
              className="w-full rounded-md p-2 text-lg outline-none"
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
        </form>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="sans-serif text-p-white bg-b-green rounded px-3 py-2 text-xs font-bold"
            onClick={onSave}
          >
            {" "}
            Save profile
          </button>
          <button
            className="sans-serif text-p-white rounded bg-[#567] px-3 py-2 text-xs font-bold"
            onClick={navigateToProfile}
          >
            Go back to profile
          </button>
          {/* <button onClick={updatePFP}>Update Avatar</button> */}
        </div>
      </div>

      <Footer />
    </>
  );
}
