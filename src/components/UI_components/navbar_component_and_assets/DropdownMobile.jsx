import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import { auth } from "../../../firebase/firebase";
import SignInGoogle from "../../auth/auth_methods/SignInGoogle";
import SignInTest from "../../auth/auth_methods/SignInTest";

const DropdownMobile = ({
  authStatus,
  setUserLogin,
  userLogin,
  userName,
  profilePic,
  DDMobOpen,
  setDDMobOpen,
  dropDownRef,
}) => {
  const dropdownList = dropdownLinksData;
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (authStatus) {
      setUserLogin(true);
      setUid(auth.currentUser.uid);
    } else {
      setUserLogin(false);
    }
    let handlerDDMob = (e) => {
      if (!dropDownRef.current.contains(e.target)) {
        setDDMobOpen(false);
      }
    };
    document.addEventListener("mousedown", handlerDDMob);
    return () => {
      document.removeEventListener("mousedown", handlerDDMob);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  return (
    <>
      <div
        className={`mobile-dropdown-nav ${
          DDMobOpen ? "active" : "inactive"
        } rounded-sm p-2 bg-h-blue static z-999 sans-serif flex-col
        absolute top-[2.3rem] left-0 w-full`}
      >
        {userLogin ? (
          <div className="py-1 flex mx-4 z-50">
            <div className="flex gap-1">
              <Link to={"/profile/" + uid}>
                <img
                  src={profilePic}
                  alt={userName}
                  width={24}
                  height={24}
                  className="rounded-xl"
                />
              </Link>
              <Link
                to={"/profile/" + uid}
                className=" text-p-white font-semibold hover:cursor-pointer hover:text-p-white uppercase z-50"
              >
                {userName}
              </Link>
            </div>
            <p></p>
          </div>
        ) : (
          ""
        )}

        <ul className="rounded-sm bg-h-blue mx-3 py-3 z-50 sans-serif text-sh-grey font-bold tracking-widest uppercase">
          <li className="divider-mobile"></li>

          <li className="py-2 grid grid-cols-2">
            {dropdownList.map((L) => (
              <Link key={L.id} className={`py-0.5 mx-3`} to={L.link}>
                {L.name}
              </Link>
            ))}
          </li>
          <li className="divider-mobile"></li>
          {userLogin ? (
            <li className="z-50 py-3 mx-3 grid grid-cols-2">
              <Link to="/settings" className="block pt-2 z-50">
                Settings
              </Link>
              <SignOut setDDMobOpen={setDDMobOpen} />
            </li>
          ) : (
            <li className="z-50 pt-3 grid grid-cols-2">
              <SignInGoogle />
              <SignInTest />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropdownMobile;
