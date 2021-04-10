import Head from "next/head";
import Logo from "../../components/logo";
import styles from "../../styles/Dashboard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import AppUI from "../../components/AppUI";

const apps = [
  {
    id: "github",
    logo:
      "https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg",
    url: "ws://192.168.1.67:8080",
  },
  {
    id: "jira",
    logo:
      "https://freeicons.io/icon/download?_token=gHqTNurkWECxPH30NM6HzwO4K0RhyvhtdYw5wJVi&icon_id=6276&type=svg",
    url: "ws://192.168.1.67:8081",
  },
  {
    id: "jenkins",
    logo: "https://www.jenkins.io/images/logos/jenkins/256.png",
    url: "ws://192.168.1.67:8082",
  },
  {
    id: "tasks",
    logo:
      "https://icons.iconarchive.com/icons/cornmanthe3rd/squareplex/512/Utilities-tasks-icon.png",
    url: "ws://192.168.1.67:8083",
  },
  {
    id: "daily",
    logo:
      "https://pics.freeicons.io/uploads/icons/png/426841071578378313-512.png",
    url: "ws://192.168.1.67:8084",
  },
  {
    id: "queue",
    logo:
      "https://pics.freeicons.io/uploads/icons/png/1198703521579156625-512.png",
    url: "ws://192.168.1.67:8085",
  },
];

export default function Dashboard() {
  const router = useRouter();

  const { app: appId } = router.query;

  const app = apps.find(({ id }) => id === appId);

  // Criar um botão q tu clique e temporariamente exibe també o nome das APP's

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

      <div className={styles.apps}>
        <Link href="./hall.io">
          <div
            style={appId === "hall.io" ? { backgroundColor: "#F0DFAD33" } : {}}
          >
            <Logo />
          </div>
        </Link>
        {apps.map(({ id, logo }) => (
          <Link key={id} href={`./${id}`}>
            <div style={appId === id ? { backgroundColor: "#F0DFAD33" } : {}}>
              <img src={logo} />
            </div>
          </Link>
        ))}
      </div>

      {app ? (
        <div className={styles.app}>
          <AppUI app={app} />
        </div>
      ) : (
        <>404</>
      )}
    </div>
  );
}

/**
 * 1. Definir componentes (table, input, button, select, label)
 * 2. Criar APP local para gerenciar APP's (no inicio vai trabalhar offline)
 * 3. Criar uma forma de definir layout
 *          - Type: group
 *          -    table 1 3 / 1 3
 *          - Deve usar grid layout only
 *
 */
