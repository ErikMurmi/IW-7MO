import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>UsCrud-Home</title>
        <meta name="description" content="Developed by Erik Murminacho" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        USERS CRUD <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>
        Develop by Erik Murminacho{' '}
        <code className={styles.code}>pages/index.js</code>
      </p>

        
    </div>
  )
}
