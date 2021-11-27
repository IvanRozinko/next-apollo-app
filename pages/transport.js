import { useState, useEffect } from "react";
import { logout } from "../utils/auth";
import styles from "../styles/Home.module.css";
import { fetchData } from "../utils/fetchData";
import { query as stationsQuery } from "../utils/queries";
import Router from "next/router";

export default function Transport({ stations, email }) {
  const [coordinates, setCoordinates] = useState({
    lng: "",
    lat: "",
  });

  const handleInput = (e) => {
    const value = e.target.value;
    const fieldName = e.target.name;
    // add more strict check of input value
    if (!isNaN(value)) {
      setCoordinates({
        ...coordinates,
        [fieldName]: e.target.value,
      });
    }
  };

  const handleSearchPress = () => {
    if (lng && lat) {
      Router.push({
        pathname: '/transport',
        query: { lng, lat }
      })
      setCoordinates({ lng: "", lat: "" });
    }
  };

  const { lng, lat } = coordinates;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={logout}>Выход</button>
      </div>
      <main className={styles.main}>
        <h1>Вы вошли как {email}</h1>
        <div className={styles.form}>
          <label>
            Широта:
            <input name="lat" value={lat} onChange={handleInput} />
          </label>
          <label>
            Долгота:
            <input name="lng" value={lng} onChange={handleInput} />
          </label>
          <button onClick={handleSearchPress}>
            Поиск
          </button>
        </div>
        {stations && stations.length > 0 && (
          <div className={styles.stations}>
            <div>Ближайшие станции:</div>
            {stations.map(({ node }, index) => (
              <div className={styles.station} key={node.id}>
                <span className={styles.name}>{`${index + 1}. ${
                  node.name
                }`}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// As I got from /graphql docs the bikeStation query returns only signle object of BikeStation based on coordinates
// and stations array is collection of MetroStations related to lineId
// test assignment need to clarify this

export async function getServerSideProps(ctx) {
  const response = await fetchData("/user", ctx);
  if (response.status !== 200) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { email } = await response.json();

  let stations = [];
  // check if query params exists refetch stations
  const { lat, lng } = ctx.query;
  if (lat && !isNaN(lat) && lng && !isNaN(lng)) {
    const response = await stationsQuery("GET_STATIONS", {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
    if (response?.stations?.edges) {
      stations = response?.stations?.edges
    }
  }

  return {
    props: {
      email,
      stations
    },
  };
}
