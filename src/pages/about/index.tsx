import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AboutHome() {
  const router = useRouter();
  return (
    <div className='container'>
      <article className='blog-container'>
        <Link
          className='name-logo nav-link'
          href={'/'}>
          <motion.h1
            whileHover={{ color: 'rgb(255, 184, 28)' }}
            whileTap={{ scale: 0.95 }}>
            Dwight McLeish Jr
          </motion.h1>
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
        </motion.div>
        <motion.div>
          <p>I&#x27;m a Junior Developer at Spectrum Inc.</p>
          <p>
            I <motion.span whileHover={{ color: '#FFC0CB' }}>hope</motion.span> this space will motivate anyone new to software development
            to never give up. Programming is hard... but we are a stubbern breed and will always keep trying.
          </p>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 0.6 } }}>
          <p>
            Made with <motion.span whileHover={{ color: '#ff0000' }}>&#x2764;</motion.span>
          </p>
        </motion.footer>
      </article>
    </div>
  );
}
