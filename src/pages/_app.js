import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { Layout } from 'components/Layout'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {

  return (
    <SessionProvider>
      <Layout>
        <header>
        <title>Playc-Home </title>
            <meta name="description" content="Developed by Erik Murminacho" />
            <link rel="icon" href="/favicon.ico" />
        </header>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    )
}

export default MyApp
