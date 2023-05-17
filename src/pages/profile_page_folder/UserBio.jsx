import UserCounts from "./UserCounts";
import UserInfo from "./UserInfo";
import React from "react";

const UserBio = ({
  authStatus,
  isProfileUpdated,
  setProfileUpdated,
  favCount,
  watchedCount,
  newDataGained,
}) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between mb-10">
      <UserInfo
        authStatus={authStatus}
        isProfileUpdated={isProfileUpdated}
        setProfileUpdated={setProfileUpdated}
      />
      <UserCounts
        favCount={favCount}
        watchedCount={watchedCount}
        newDataGained={newDataGained}
      />
    </div>
  );
};
export default UserBio;
