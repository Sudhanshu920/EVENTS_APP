import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const index = ({ data, pageName }) => {
  return (
    <div>
      <h1>Events in {pageName}</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${pageName}/${ev.id}`}>
            <Image src={ev.image} width={200} height={200} alt={ev.title} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
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
