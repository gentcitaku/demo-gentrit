'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index?: number
}

export function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 bg-card hover:bg-card/80 border-border/50 transition-all duration-300 h-full">
        <motion.div
          className="p-3 w-fit rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  )
}
