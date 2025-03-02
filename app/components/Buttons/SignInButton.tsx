export const SignInButton = ({ onClick }: { onClick: () => any }) => {
  return (
    <li className="ml-4 items-center  self-center pt-2" onClick={onClick}>
      <p className="sans-serif text-sh-grey hover:text-p-white ml-4 text-xs font-bold uppercase	tracking-widest hover:cursor-pointer">
        SIGN IN
      </p>
    </li>
  );
};
