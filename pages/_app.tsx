import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Head>
				<title>Dwight Mcleish | Developer</title>
			</Head>
			<div className='canvas'>
				<canvas className='connecting-dots'></canvas>
			</div>

			<Script src='main.js' strategy='beforeInteractive'></Script>
			<Component {...pageProps} />
		</Fragment>
	);
}
