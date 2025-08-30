// app/components/AnimatedText.js
"use client";

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedText = ({ text, className, type = 'letter' }) => {
  const items = type === 'letter' ? Array.from(text) : text.split(' ');

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ marginRight: type === 'word' ? '0.25em' : '0' }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;