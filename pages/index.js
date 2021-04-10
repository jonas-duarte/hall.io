import Head from 'next/head'
import { useState } from 'react'
import Logo from '../components/logo'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const [showGS, setShowGS] = useState(false);

  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Hall.IO</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Roboto:wght@100&display=swap" rel="stylesheet" />
      </Head>


      <div
        className={styles.gettingStarted}
        style={showGS ? {
          height: "100%",
          width: "100%",
          borderRadius: "0px",
          padding: "0px"
        } : {}}
        onClick={() => setShowGS(true)}
      >
        {showGS ? (() => {
          setTimeout(() => {
            router.push('/docs/1')
          }, 200)
          return ""
        })()
          : "Getting Started"}
      </div>

      <Link href="/dashboard">
        <div className={styles.dashboard}>
          DASHBOARD
        </div>
      </Link>

      <div className={styles.poster}>
        <div className={styles.title}>
          <Logo />
          <span>HALL</span>
          <span>.</span>
          <span>IO</span>
        </div>
        <div className={styles.subtitle}>Connect everything.</div>
      </div>
    </div>
  )
}
