import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://barcelona-urban-mobility-graphql-api.netlify.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
