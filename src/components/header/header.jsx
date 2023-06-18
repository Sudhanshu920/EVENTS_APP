import React from 'react';
import styles from './header.module.css'
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <img className={styles.logo} src="" />
        <div className={styles.links}>
        <Link className={styles.link} href="/">Home</Link>
        <Link className={styles.link} href="/events">Events</Link>
        <Link className={styles.link} href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
