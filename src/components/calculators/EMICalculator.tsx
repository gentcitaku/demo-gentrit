
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateEMI } from '@/lib/calculations'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Copy, Check } from 'lucide-react'

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('500000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [copied, setCopied] = useState(false)

  const months = parseInt(years) * 12
  const result = principal && rate ? calculateEMI(parseInt(principal), parseFloat(rate), months) : null

  const handleCopy = () => {
    if (result) {
      const text = `EMI Calculator Result:\nLoan Amount: $${parseInt(principal).toLocaleString()}\nRate: ${rate}%\nTenure: ${years} years\nMonthly EMI: $${result.emi.toLocaleString()}\nTotal Amount: $${result.totalAmount.toLocaleString()}\nTotal Interest: $${result.totalInterest.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const chartData = result ? result.schedule.filter((_, i) => i % 12 === 0 || i === result.schedule.length - 1) : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Loan Details</h2>
        <div className="space-y-6">
          {/* Principal */}
          <div>
            <Label htmlFor="principal" className="text-sm font-medium mb-2 block">
              Loan Amount ($)
            </Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="500000"
              className="h-10"
            />
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full mt-3"
            />
            <div className="text-xs text-muted-foreground mt-1">
              $1 Lac to $1 Cr
            </div>
          </div>

          {/* Rate */}
          <div>
            <Label htmlFor="rate" className="text-sm font-medium mb-2 block">
              Interest Rate (% p.a.)
            </Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="7"
              className="h-10"
            />
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full mt-3"
            />
          </div>

          {/* Years */}
          <div>
            <Label htmlFor="years" className="text-sm font-medium mb-2 block">
              Tenure (Years)
            </Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              className="h-10"
            />
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full mt-3"
            />
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Monthly EMI', value: result.emi, bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20' },
              { label: 'Total Amount', value: result.totalAmount, bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20' },
              { label: 'Total Interest', value: result.totalInterest, bg: 'from-orange-500/10 to-red-500/10', border: 'border-orange-500/20' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${item.bg} ${item.border}`}>
                  <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                  <div className="text-3xl font-bold">${item.value.toLocaleString()}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Payment Schedule</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `$${(value as number).toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="var(--color-primary)" name="Remaining Balance" />
                <Line type="monotone" dataKey="principal" stroke="var(--color-accent)" name="Principal Paid" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Copy Button */}
          <Button 
            onClick={handleCopy}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy Results'}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
