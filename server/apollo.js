// import { withApollo } from 'next-apollo';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';

// const API_URI = `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`;

// const apolloClient = new ApolloClient( {
//     uri: API_URI,
//     cache: new InMemoryCache()
// } );

// export default withApollo( apolloClient );

import { withApollo } from "next-apollo";
// import ApolloClient, { InMemoryCache } from "apollo-boost";

import { ApolloClient, InMemoryCache } from "@apollo/client";
const API_URI = `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`;
// const API_URI = `http://localhost:4000/graphql`;

const apolloClient = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache(),
  //   fetchOptions: "cache-and-network"
  defaultOptions: {
    fetchOptions: "network-only"
  }
  // watchQuery: {

  // //   fetchPolicy: ""
  // }
});

export default withApollo(apolloClient);
