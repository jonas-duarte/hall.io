import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../../styles/GettingStarted.module.css'


export default function GettingStarted() {

    
  const router = useRouter()

    const { doc } = router.query

    return (
        <div className={styles.container}>
            <Head>
                <title>Hall.IO</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Roboto:wght@100&display=swap" rel="stylesheet" />
            </Head>

            {doc}
            <br></br>

            <Link href="/docs/1">Bla bla bla</Link>
            <br></br>
            <Link href="/docs/2">Bla bla bla</Link>
            <br></br>
            <Link href="/docs/3">Bla bla bla</Link>
            <br></br>

        </div>
    )
}
