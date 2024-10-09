import { Provider } from 'react-redux'

import { getLayout } from '@/components'
import { store } from '@/lib/store'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link
          href={'/apple-touch-icon.png?v=2'}
          media={'(prefers-color-scheme: dark)'}
          rel={'apple-touch-icon'}
          sizes={'180x180'}
        />
        <link
          href={'/apple-touch-icon-dark.png?v=2'}
          media={'(prefers-color-scheme: light)'}
          rel={'apple-touch-icon'}
          sizes={'180x180'}
        />
        <link
          href={'/favicon-32x32.png?v=2'}
          media={'(prefers-color-scheme: dark)'}
          rel={'icon'}
          sizes={'32x32'}
          type={'image/png'}
        />
        <link
          href={'/favicon-dark-32x32.png?v=2'}
          media={'(prefers-color-scheme: light)'}
          rel={'icon'}
          sizes={'32x32'}
          type={'image/png'}
        />
        <link
          href={'/favicon-16x16.png?v=2'}
          media={'(prefers-color-scheme: dark)'}
          rel={'icon'}
          sizes={'16x16'}
          type={'image/png'}
        />
        <link
          href={'/favicon-dark-16x16.png?v=2'}
          media={'(prefers-color-scheme: light)'}
          rel={'icon'}
          sizes={'16x16'}
          type={'image/png'}
        />
        <link href={'/site.webmanifest'} rel={'manifest'} />
        <link
          href={'/favicon.ico?v=2'}
          id={'favicon'}
          media={'(prefers-color-scheme: dark)'}
          rel={'icon'}
        />
        <link href={'/favicon-dark.ico?v=2'} media={'(prefers-color-scheme: light)'} rel={'icon'} />
      </Head>
      <main></main>
    </>
  )
}

Home.getLayout = getLayout
