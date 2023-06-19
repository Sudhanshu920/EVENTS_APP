import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from './index2.module.css'

const SingleEvent = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message,setMessage]=useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const eventID = router?.query.id;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }

    try {
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, eventID }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = '';
    } catch (err) {
      console.log('ERROR : ', err);
    }
  };
  return (
    <div className={styles.container}>
    <div>
      <h2 className={styles.title}>{data.title}</h2>
      <Image src={data.image} alt={data.title} width={400} height={400} />
    </div>
      <div>
      <p className={styles.desc}>{data.description}</p>
      <form className={styles.form} onSubmit={onSubmit}>
        <label>get registered for this event!</label>
        <input
          ref={inputEmail}
          id="email"
          placeholder="please insert your email here"
          className={styles.input}
        />
        <button className={styles.button} type="submit">Submit</button>
      </form>
      <p>{message}</p>
      </div>
    </div>
  );
};

export default SingleEvent;

export async function getStaticPaths() {
  const { allEvents } = await import('./../../../data/data.json');

  const paths = allEvents.map((item) => ({
    params: { id: item.id, cat: item.city },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { allEvents } = await import('./../../../data/data.json');
  const data = allEvents.find((item) => item.id === context.params.id);
  return {
    props: {
      data,
      pageName: context.params.cat,
    },
  };
}
