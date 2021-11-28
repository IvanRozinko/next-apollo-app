import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { login } from "../utils/auth";
import { fetchData } from "../utils/fetchData";

export default function Main({ loading }) {
  const [credentials, setCredantials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    setCredantials({
      ...credentials,
      [fieldName]: e.target.value,
    });
  };

  const handleLoginClick = async () => {
    const response = await fetchData(
      "/login",
      {},
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.status === 200) {
      const { token } = await response.json();
      login(token);
    } else {
      const { message } = await response.json();
      console.log(message);
    }
  };

  const { email, password } = credentials;
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-apollo-app</title>
        <meta name="description" content="Next-apollo-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.form}>
          <h1>Login</h1>
          <label>
            Email:
            <input name="email" value={email} onChange={handleInput} />
          </label>
          <label>
            Пароль:
            <input
              name="password"
              value={password}
              onChange={handleInput}
              type="password"
            />
          </label>
          <button onClick={handleLoginClick} disabled={loading}>
            Вход
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const response = await fetchData("/user", ctx);
  if (response.status === 200) {
    return {
      redirect: {
        destination: "/transport",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
