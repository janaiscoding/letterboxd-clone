import React from 'react';
import { Link } from 'react-router-dom';
import footerLinksData from './footerLinksData';
import socialLinksData from './socialLinksData';
const Footer = () => {
  const footerLinks = footerLinksData;
  const socials = socialLinksData;
  return (
    <footer
      className="relative z-[9999]"
      style={{ backgroundColor: '#2c3440' }}
    >
      <div className="flex flex-col px-4 py-6 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] ">
        <nav className="mb-3 flex items-center justify-between">
          <ul className=" grid grid-cols-3 py-1  md:flex">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <p
                  className="text-s mr-2 font-bold text-sh-grey hover:cursor-pointer hover:text-p-white"
                  to={link.link}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <ul className=" sans-serif hidden flex-col items-center justify-between gap-2 py-1 md:flex  md:flex-row  md:gap-0">
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
        <p className="pb-3 text-xs text-sh-grey">
          © Clonnerboxd Limited. Made by{' '}
          <a className="underline" href="https://github.com/JanaIsCoding">
            JanaIsCoding
          </a>
          . Film data from{' '}
          <a className="underline" href="https://www.themoviedb.org/">
            TMDb
          </a>
          . Inspired by{' '}
          <a className="underline" href="https://letterboxd.com/">
            Letterboxd
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
