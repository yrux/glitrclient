import '../main.css'
import { motion } from 'framer-motion';
var animatetoggle=false;
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps, router}) {
animatetoggle=!animatetoggle;
  return <motion.div key={router.route}
        initial={{ opacity: 0, x: (animatetoggle===false?400:-400),y:0 }}
        animate={{ opacity: 1,x:0,y:0 }}
        exit={{ opacity: 0,x:0,y:0 }}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
  >
      <Component {...pageProps} />
    </motion.div>
}