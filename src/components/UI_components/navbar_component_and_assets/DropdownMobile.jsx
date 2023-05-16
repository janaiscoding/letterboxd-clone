import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import SignInAll from "../../auth/auth_methods/SignInAll";

const DropdownMobile = ({
  authStatus,
  setUserLogin,
  userLogin,
  userName,
  profilePic,
}) => {
  const dropdownList = dropdownLinksData;
  useEffect(() => {
    if (authStatus) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  return (
    <>
      <div className="mobile-nav rounded-sm p-2 bg-h-blue flex flex-col self-start">
        {userLogin ? (
          <div className="flex items-center px-2 mx-1">
            <img
              src={profilePic}
              alt={userName}
              width={24}
              height={24}
              className="rounded-xl"
            />
            <span className=" text-p-white font-semibold hover:cursor-pointer hover:text-p-white uppercase mx-1">
              {userName}
            </span>
          </div>
        ) : (
          ""
        )}

        <ul className="rounded-sm text-base text-sh-grey bg-h-blue uppercase mx-3 py-3">
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
            <li className="grid grid-cols-2 pt-2">
              <Link to="/settings" className="block pt-2 px-4">
                Settings
              </Link>
              <SignOut />
            </li>
          ) : (
            <li className="flex justify-between pt-2">
              <Link to="/settings" className="block pt-2 px-4">
                Settings
              </Link>
              <SignInAll />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropdownMobile;
