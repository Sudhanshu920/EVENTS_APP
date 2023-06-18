import React from 'react';
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerContent}>© 2023 Events App - A Project Built with Next.js</p>
    </footer>
  );
};

export default Footer;
