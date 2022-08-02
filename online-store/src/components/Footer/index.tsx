import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { footerLinks } from './contants';
import './style.scss';

const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <ul className="footer__info">
        {footerLinks.map(({ children, href, rel, target }) => {
          return (
            <li key={uuidv4()}>
              <a href={href} target={target} rel={rel}>
                {typeof children === 'string' ? (
                  children
                ) : (
                  <img className={children.className} src={children.src} alt={children.alt} />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
