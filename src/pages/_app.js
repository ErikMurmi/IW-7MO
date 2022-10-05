import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return <>
    <heaader>
    <title>UsCrud </title>
        <meta name="description" content="Developed by Erik Murminacho" />
        <link rel="icon" href="/favicon.ico" />
    </heaader>
    <Component {...pageProps} />
  </>
}

export default MyApp
