import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactPage() {
	return (
		<div className='container'>
			<article className='blog-container'>
				<Link
					className='name-logo nav-link'
					href={''}>
					<h1>Contact</h1>
				</Link>
				<motion.div className='nav-line'>
					<Link
						href={'/'}
						className='nav-link'>
						<motion.p
							whileHover={{ color: 'rgb(255, 184, 28)', scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Return
						</motion.p>
					</Link>
					<Link
						href={'contact'}
						className='nav-link'>
						<motion.p
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Contact
						</motion.p>
					</Link>
					{/* <Link
						href={'posts'}
						className='nav-link'>
						<motion.p
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Posts
						</motion.p>
					</Link> */}
				</motion.div>
				<motion.div>
					<p>
						<a
							className='nav-link'
							href='https://docs.google.com/document/d/1k69X7p3aRDJbZYn-zoAQstD3MNLTcVwjmR8Bxyqc9-4/edit?usp=sharing'>
							Resume
						</a>
					</p>
					<p>
						<a
							className='nav-link'
							href='https://github.com/dmcleish91'>
							Github
						</a>
					</p>
				</motion.div>
				<footer>
					<p>Let's create something</p>
				</footer>
			</article>
		</div>
	);
}
