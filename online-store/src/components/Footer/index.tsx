import React from 'react';
import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__info">
        <a href="https://github.com/GlebKolyano" target="_blank" rel="noreferrer">
          Gleb Kolyano
        </a>
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img
            className="footer__logo"
            src="https://rs.school/images/rs_school_js.svg"
            alt="logo-rs-school"
          />
        </a>
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          RS School, 2022
        </a>
      </div>
    </div>
  );
}

export default Footer;
