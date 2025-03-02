import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/firebase";
import { usePathname, useRouter } from "next/navigation";

export const SignOut = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onSignOut = () => {
    signOut(auth);

    // go back home, traveler
    if (pathname?.includes("profile")) {
      router.push("/");
    }
  };

  return (
    <p
      className="block cursor-pointer px-4 pt-2 hover:text-white md:p-0"
      onClick={onSignOut}
    >
      Sign Out
    </p>
  );
};
