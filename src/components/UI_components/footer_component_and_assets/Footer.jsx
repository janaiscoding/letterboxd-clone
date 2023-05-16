import React from "react";
import { Link } from "react-router-dom";
import footerLinksData from "./footerLinksData";
import socialLinksData from "./socialLinksData";
const Footer = () => {
  const footerLinks = footerLinksData;
  const socials = socialLinksData;
  return (
    <footer style={{ backgroundColor: "#2c3440" }}>
      <div className="px-4 flex flex-col py-6 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <nav className="flex justify-between items-center mb-3">
          <ul className=" md:flex grid grid-cols-3  py-1">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <Link
                  className="text-s text-sh-grey hover:text-p-white font-bold mr-2"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex sans-serif flex-col gap-2 md:gap-0 md:flex-row justify-between  items-center  py-1">
            {socials.map((social) => (
              <li className="self-center" key={social.id}>
                <Link to={social.link}>
                  <svg
                    width={social.width}
                    height={social.height}
                    fill="#9ab"
                    className="mr-2"
                  >
                    <path d={social.path}></path>
                  </svg>
                  <span className="hidden">{social.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-sh-grey pb-3">
          © Clonnerboxd Limited. Made by{" "}
          <a className="underline" href="https://github.com/JanaIsCoding">
            JanaIsCoding
          </a>
          . Film data from{" "}
          <a className="underline" href="https://www.themoviedb.org/">
            TMDb
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
export default Footer;
