import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import MemberContainer from "./MemberContainer";

const Members = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersfromDB = async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    let tempArray = [];
    usersSnap.forEach((doc) => {
      tempArray.push(doc.data());
    });

    tempArray.sort((a, b) => {
      if (a.name.includes("Jana")) return -1;
      if (b.name.includes("Jana")) return 1;
    });

    setUsers(tempArray);
  };

  useEffect(() => {
    fetchUsersfromDB();
  }, []);

  return (
    <div className="site-body min-h-[80vh] py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <div className="section-heading border-b-grey text-sh-grey mb-3 flex justify-between border-b border-solid text-xs">
          <p>MEMBERS OF CLONNERBOXD</p>
          {users.length > 0 && <p>{users.length} total members</p>}
        </div>

        <div className="grid__wrapper">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="users__wrapper stext-sh-grey border-b-grey flex flex-col border-b border-solid text-xs"
              >
                <MemberContainer key={user.uid} user={user} />
              </div>
            ))
          ) : (
            <p>No users yet, login to be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
