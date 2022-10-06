import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { Layout } from 'components/Layout'

function MyApp({ Component, pageProps }) {

  return (<Layout>
    <header>
    <title>UsCrud </title>
        <meta name="description" content="Developed by Erik Murminacho" />
        <link rel="icon" href="/favicon.ico" />
    </header>
    <Component {...pageProps} />
  </Layout>)
}

export default MyApp
