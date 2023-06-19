import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css'

const index = ({ data }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Events</h1>
      <div className={styles.content}>
        {data.map((ev) => (
          <Link className={styles.item} key={ev.id} href={`events/${ev.id}`}>
            <Image src={ev.image} alt={ev.title} width={300} height={300} />
            <h3 className={styles.title}>{ev.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default index;

export const getStaticProps = async () => {
  const data = await import('./../../data/data.json');
  return { props: { data: data.events_categories } };
};
