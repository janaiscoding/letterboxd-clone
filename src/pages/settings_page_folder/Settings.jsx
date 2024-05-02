import React from 'react';
import ChangeUserInfo from '../../components/auth/auth_methods/ChangeUserInfo';

const Settings = ({ setProfileUpdated }) => {
  return (
    <div className="site-body min-h-[80vh] py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <ChangeUserInfo setProfileUpdated={setProfileUpdated} />
      </div>
    </div>
  );
};

export default Settings;
