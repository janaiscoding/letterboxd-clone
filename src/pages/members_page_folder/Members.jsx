import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import MemberContainer from "./MemberContainer";
const Members = () => {
  const [users, setUsers] = useState([]);
  const fetchUsersfromDB = async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    let tempArray = [];
    usersSnap.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setUsers(tempArray);
  };
  useEffect(() => {
    fetchUsersfromDB();
  }, []);
  return (
    <div className="site-body py-5">
      <div className="flex flex-col px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <div
          className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-3"
        >
          <Link to="/members/" className="text-sm hover:text-hov-blue">
            MEMBERS OF CLONNERBOXD
          </Link>
        </div>

        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex flex-col text-sh-grey 
          text-xs
          border-b 
          border-solid 
          border-b-grey"
            >
              <MemberContainer key={user.uid} user={user} />
            </div>
          ))
        ) : (
          <p>No users yet, login to be the first!</p>
        )}
      </div>
    </div>
  );
};

export default Members;
