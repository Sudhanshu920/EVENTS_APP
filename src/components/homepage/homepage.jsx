import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import sytles from './homepage.module.css'

const Homepage = ({data}) => {
  return (
    <main className={sytles.content}>
        {data.map((ev) => (
          <Link className={sytles.events} key={ev.id} href={`events/${ev.id}`}>
            <Image className={sytles.img} alt={ev.title} src={ev.image} width={300} height={300} />
            <h2 className={sytles.eventName}>{ev.title}</h2>
            <p className={sytles.eventDesc}>{ev.description}</p>
          </Link>
        ))}
      </main>
  )
}

export default Homepage