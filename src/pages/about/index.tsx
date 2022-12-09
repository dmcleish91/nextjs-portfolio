import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutHome() {
	return (
		<div className='container'>
			<article className='blog-container prose prose-sm md:prose'>
				<motion.h1 whileHover={{ color: 'rgb(255, 184, 28)' }}>Dwight McLeish Jr</motion.h1>
				<div className='nav-line'>
					<Link
						href={''}
						className='nav-link'>
						<motion.p
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Photos
						</motion.p>
					</Link>
					<Link
						href={''}
						className='nav-link'>
						<motion.p
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Posts
						</motion.p>
					</Link>
					<Link
						href={'/'}
						className='nav-link'>
						<motion.p
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Return
						</motion.p>
					</Link>
				</div>
				<p>I&#x27;m a Junior Developer at Spectrum Inc.</p>
				<p>
					I <motion.span whileHover={{ color: '#FFC0CB' }}>hope</motion.span> this space will motivate anyone new to software
					development to never give up. Programming is hard... but we are stubbern breed and will always keep trying.
				</p>

				<footer>
					<p>
						{' '}
						Made with <motion.span whileHover={{ color: '#ff0000' }}>&#x2764;</motion.span>{' '}
					</p>
				</footer>
			</article>
		</div>
	);
}
