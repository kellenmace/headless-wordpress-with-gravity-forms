import { AppContext, AppInitialProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { client } from '../services/apollo';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppContext & AppInitialProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
