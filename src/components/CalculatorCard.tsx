'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator } from '@/lib/calculatorData'

interface CalculatorCardProps {
  calculator: Calculator
  index?: number
}

export function CalculatorCard({ calculator, index = 0 }: CalculatorCardProps) {
  const Icon = calculator.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card h-full">
        <div className={`h-1 bg-gradient-to-r ${calculator.color}`} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`p-3 rounded-lg bg-gradient-to-br ${calculator.color}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              {calculator.category}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-2">{calculator.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{calculator.description}</p>
          <Link href={`/calculators/${calculator.slug}`}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Open Calculator
              </Button>
            </motion.div>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}
