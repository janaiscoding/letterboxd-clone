import UserCounts from "./UserCounts";
import UserInfo from "./UserInfo";
import React from "react";

const UserBio = ({
  uid,
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
        uid={uid}
        authStatus={authStatus}
        isProfileUpdated={isProfileUpdated}
        setProfileUpdated={setProfileUpdated}
      />
      <UserCounts
        uid={uid}
        favCount={favCount}
        watchedCount={watchedCount}
        newDataGained={newDataGained}
      />
    </div>
  );
};
export default UserBio;
