import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/GettingStarted.module.css";

const docs = [
  { label: "Hall.IO", path: "hall.io", doc: "Hall.io is bla bla bla" },
  { label: "Apps", path: "apps", doc: "The apps allow you bla bla bla" },
  {
    label: "Auth",
    path: "auth",
    doc: "The auth is pretty easy, there is no auth!!!",
  },
];

export default function GettingStarted() {
  const router = useRouter();

  const { doc } = router.query;

  const { doc: panel } = docs.find(({ path }) => path === doc) || {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Hall.IO</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.nav}>
        {docs.map(({ label, path }, index) => (
          <Link href={`/docs/${path}`}>{`${index + 1}. ${label}`}</Link>
        ))}
        <br></br>
        <br></br>
        <Link href="/dashboard/hall.io">dashboard</Link>
        <Link href="/">home</Link>
      </div>
      <div className={styles.panel}>{panel}</div>
    </div>
  );
}
