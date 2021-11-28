import React from "react";
import styles from "../styles/Home.module.css";

function Stations({ stations }) {
  return (
    stations &&
    stations.length > 0 && (
      <div className={styles.stations}>
        <div>Ближайшие станции:</div>
        {stations.map(({ node }, index) => (
          <div className={styles.station} key={node.id}>
            <span className={styles.name}>{`${index + 1}. ${node.name}`}</span>
          </div>
        ))}
      </div>
    )
  );
}

export default Stations;
