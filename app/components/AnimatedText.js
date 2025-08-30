// app/components/AnimatedText.js
"use client";

import { motion } from 'framer-motion';

// Định nghĩa kịch bản animation cho container và từng chữ cái
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.025, delayChildren: 0.04 * i },
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

const AnimatedText = ({ text, className }) => {
  const letters = Array.from(text);

  return (
    <motion.h2
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={childVariants}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedText;