import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './index.module.css'

const index = ({ data, pageName }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Events in {pageName}</h1>
      <div className={styles.content}>
        {data.map((ev) => (
          <Link className={styles.item} key={ev.id} href={`/events/${pageName}/${ev.id}`}>
            <Image className={styles.image} src={ev.image} width={200} height={200} alt={ev.title} />
            <div>
            <h2 className={styles.eventName}>{ev.title}</h2>
            <p>{ev.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default index;

export async function getStaticPaths() {
  const { events_categories } = await import('./../../../data/data.json');

  const paths = events_categories.map((item) => ({
    params: { cat: item.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { allEvents } = await import('./../../../data/data.json');
  const data = allEvents.filter((item) => item.city === context.params.cat);
  return {
    props: {
      data,
      pageName: context.params.cat,
    },
  };
}
