import Link from 'next/link';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

export default function Home() {
	return (
		<div className='container'>
			<div className='card fade-in'>
				<motion.h1
					initial={{ x: -300 }}
					animate={{ x: 0, transition: { duration: 0.8 } }}>
					Hey, I'm <span className='name'>Dwight</span>
				</motion.h1>
				<motion.h1
					initial={{ x: 300 }}
					animate={{ x: 0, transition: { duration: 0.8 } }}>
					I create <span className='process'>full stack applications. </span>
				</motion.h1>
				<Link
					className='start-point'
					href={'about'}>
					<motion.h2
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						View my Blog
					</motion.h2>
				</Link>
			</div>
		</div>
	);
}
