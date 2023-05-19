import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const UserInfo = ({ uid, isProfileUpdated, setProfileUpdated }) => {
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  const [userBio, setUserBio] = useState("");

  const fetchUsername = async (uid) => {
    const userSnap = await getDoc(doc(db, "users", uid));
    if (userSnap.exists()) {
      setUserName(userSnap.data().name);
      setUserPic(userSnap.data().photoUrl);
      setUserBio(userSnap.data().bio);
    } else {
      alert("This user does not exist!");
    }
  };
  useEffect(() => {
    setProfileUpdated(false);
    fetchUsername(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, isProfileUpdated]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <img
          src={userPic}
          alt="your user profile"
          width={85}
          height={85}
          className="rounded-[50px] border-solid border border-[#678] hover:border-sh-grey hover:cursor-pointer md:w-[100px] md:h-[100px] "
        />{" "}
        <div className=" ml-4 mt-3 md:flex md:flex-col md:items-start md:gap-1 ">
          <div className="md:flex-row md:gap-2 w-full md:flex">
            <h1 className="sans-serif text-p-white font-bold text-2xl">
              {userName}
            </h1>
            <Link
              to="/settings"
              className="px-3 py-2 rounded font-bold bg-[#567] text-p-white text-xs sans-serif"
            >
              EDIT PROFILE
            </Link>
          </div>

          <p className="text-sh-grey sans-serif text-xs py-2 hidden md:block">
            Hope you are liking my project!
          </p>
        </div>
      </div>

      <p className="text-sh-grey sans-serif text-xs py-2 md:hidden">
        {userBio}
      </p>
    </div>
  );
};

export default UserInfo;
