import React from "react";
import ChangeUserInfo from "../../components/auth/auth_methods/ChangeUserInfo";

const Settings = ({setProfileUpdated}) => {
  return (
    <div className="site-body py-5 min-h-[80vh]">
      <div className="flex flex-col px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <ChangeUserInfo setProfileUpdated={setProfileUpdated} />
      </div>
    </div>
  );
};

export default Settings;
