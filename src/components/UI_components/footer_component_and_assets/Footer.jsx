import React from "react";
import { Link } from "react-router-dom";
import footerLinksData from "./footerLinksData";
import socialLinksData from "./socialLinksData";
const Footer = () => {
  const footerLinks = footerLinksData;
  const socials = socialLinksData;
  return (
    <>
      <div className="flex">
        <ul className="flex">
          {footerLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex">
          {socials.map((social) => (
            <li key={social.id}>
              <Link to={social.link}>{social.img}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p>
        © Clonnerboxd Limited. Made by
        <a href="https://github.com/JanaIsCoding"> JanaIsCoding</a>. Film data
        from
        <a href="https://www.themoviedb.org/"> TMDb</a>.
      </p>
    </>
  );
};
export default Footer;
