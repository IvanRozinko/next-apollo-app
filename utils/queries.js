import client from "../apollo-client";
import { gql } from "@apollo/client";

export const QUERIES = {
  GET_STATIONS: gql`
    query ($lat: Float, $lng: Float) {
      station: bikeStation(
        findBy: { closest: { latitude: $lat, longitude: $lng } }
      ) {
        ... on BikeStation {
          name
          coordinates {
            longitude
            latitude
          }
          available {
            bikes {
              electrical
              mechanical
            }
          }
        }
      }
      stations: metroStations(filterBy: { lineId: 4 }, first: 3) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
};

export async function query(queryName, variables) {
  const { data } = await client.query({
    query: QUERIES[queryName],
    variables,
  });
  return data;
}
