import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const index = ({ data }) => {
  return (
    <div>
      <h1>Events</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`events/${ev.id}`}>
            <Image src={ev.image} alt={ev.title} width={200} height={200} />
            <h3>{ev.title}</h3>
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
