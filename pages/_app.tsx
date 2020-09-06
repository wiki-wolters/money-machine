import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../src/configureClient';

interface MyAppProps extends AppProps {
    apollo: any
}

function MyApp({ Component, pageProps, apollo }: MyAppProps) {
  return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
  );
}

export default withData(MyApp);
