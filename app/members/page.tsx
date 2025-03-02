"use client";

import { Footer } from "app/components/Navigation/Footer";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import { UserCard } from "app/components/User/UserCard";
import { User } from "app/types";

import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "app/firebase/firebase";

// @to-do infinite scrolling
// @to-do sort by most watches, most favs, etc..
export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllUsers = async () => {
    const userDocs = await getDocs(collection(db, "users"));
    const users = userDocs.docs.map((doc) => doc.data()) as User[];

    const sorted = users.sort((a, b) => {
      if (a.name.includes("Jana")) return -1;
      if (b.name.includes("Jana")) return 1;

      return 1;
    });

    setUsers(sorted);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <LayoutNavbar />
      <div className="site-body min-h-[80vh] py-5">
        <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
          <div className="section-heading border-b-grey text-sh-grey mb-3 flex justify-between border-b border-solid text-xs">
            <p>MEMBERS OF CLONNERBOXD</p>
            {users.length > 0 && <p>{users.length} total members</p>}
          </div>
          {isLoading && <p>Loading users...</p>}

          {!isLoading && !users.length && (
            <p>No users yet, login to be the first!</p>
          )}

          {!isLoading &&
            users.length &&
            users.map((user, i) => (
              <div
                key={i}
                className="users__wrapper text-sh-grey border-b-grey flex flex-col border-b border-solid text-xs"
              >
                <UserCard user={user} />
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
