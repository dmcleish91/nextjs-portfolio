import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<div>
				<div className='canvas'>
					<canvas className='connecting-dots'></canvas>
				</div>
				<div className='heading'></div>
			</div>
			<Script src='main.js' strategy='beforeInteractive'></Script>
			<Component {...pageProps} />
		</Fragment>
	);
}
