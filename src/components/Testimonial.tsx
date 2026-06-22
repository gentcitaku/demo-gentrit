'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  index?: number
}

export function Testimonial({ quote, author, role, index = 0 }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 bg-card border-border/50 h-full flex flex-col justify-between">
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>
        <p className="text-sm text-foreground mb-6 italic">"{quote}"</p>
        <div>
          <p className="font-semibold text-sm">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </Card>
    </motion.div>
  )
}
