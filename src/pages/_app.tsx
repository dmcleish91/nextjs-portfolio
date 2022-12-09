import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<Fragment>
			<Head>
				<title>Dwight Mcleish | Developer</title>
			</Head>
			<div className='canvas'>
				<canvas className='connecting-dots'></canvas>
			</div>

			<Script
				src='main.js'
				strategy='beforeInteractive'></Script>
			<AnimatePresence mode='wait'>
				<motion.div
					key={router.route}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					<Component {...pageProps} />
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
