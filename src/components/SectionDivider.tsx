'use client'

import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />
  )
}
