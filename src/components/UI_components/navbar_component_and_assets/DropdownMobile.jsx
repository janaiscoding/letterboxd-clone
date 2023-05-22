import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import SignInAll from "../../auth/auth_methods/SignInAll";
import { auth } from "../../../firebase/firebase";
const DropdownMobile = ({
  authStatus,
  setUserLogin,
  userLogin,
  userName,
  profilePic,
  DDMobOpen,
  setDDMobOpen,
}) => {
  const dropdownList = dropdownLinksData;
  const [uid, setUid] = useState("");
  let dropDownRef = useRef();
  useEffect(() => {
    if (authStatus) {
      setUserLogin(true);
      setUid(auth.currentUser.uid);
    } else {
      setUserLogin(false);
    }
    let handler = (e) => {
      console.log(e.target);
      if (!dropDownRef.current.contains(e.target)) {
        setDDMobOpen(false);
        console.log(dropDownRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  return (
    <>
      <div ref={dropDownRef}>
        <div
          className={`mobile-dropdown-nav ${
            DDMobOpen ? "active" : "inactive"
          } rounded-sm p-2 bg-h-blue static z-999 sans-serif`}
        >
          {userLogin ? (
            <div className="py-1 grid grid-cols-2 mx-3 z-50">
              <div className="flex gap-1 px-4">
                <Link to={"/profile/" + uid}>
                  <img
                    src={profilePic}
                    alt={userName}
                    width={24}
                    height={24}
                    className="rounded-xl"
                  />
                </Link>
                <p className=" text-p-white font-semibold hover:cursor-pointer hover:text-p-white uppercase z-50">
                  {userName}
                </p>
              </div>
              <p></p>
            </div>
          ) : (
            ""
          )}

          <ul className="rounded-sm text-base text-sh-grey bg-h-blue uppercase mx-3 py-3 z-50">
            <li className="divider-mobile"></li>

            <li className="py-3 grid grid-cols-2">
              {dropdownList.map((L) => (
                <p key={L.id} className="py-0.5 px-4">
                  <Link to={L.link}>{L.name}</Link>
                </p>
              ))}
            </li>
            <li className="divider-mobile pt-2"></li>
            {userLogin ? (
              <li className="grid grid-cols-2 pt-2  z-50">
                <Link to="/settings" className="block pt-2 px-4 z-50">
                  Settings
                </Link>
                <SignOut />
              </li>
            ) : (
              <li className="flex justify-between pt-2 z-50">
                <Link to="/settings" className="block pt-2 px-4 z-50">
                  Settings
                </Link>
                <SignInAll />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropdownMobile;
