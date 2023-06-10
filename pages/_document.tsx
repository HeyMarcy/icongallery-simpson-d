import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='Icon Gallery Viewing Room curated for Deanna Simpson'
          />
          <meta property='og:site_name' content='Iconic Archives' />
        </Head>
        <body className='bg-black antialiased'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
