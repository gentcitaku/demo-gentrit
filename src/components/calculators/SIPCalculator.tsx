'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateSIP } from '@/lib/calculations'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Copy, Check } from 'lucide-react'

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState('10000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('10')
  const [copied, setCopied] = useState(false)

  const result = monthlyAmount && rate && years ? calculateSIP(parseInt(monthlyAmount), parseFloat(rate), parseInt(years), parseFloat(rate)) : null

  const handleCopy = () => {
    if (result) {
      const text = `SIP Calculator Results:\nMonthly Investment: $${result.monthlyAmount.toLocaleString()}\nTotal Invested: $${result.totalInvested.toLocaleString()}\nExpected Value: $${result.futureValue.toLocaleString()}\nExpected Gains: $${result.gains.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">SIP Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Investment ($)</Label>
            <Input
              type="number"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              placeholder="10000"
              className="h-10"
            />
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              className="w-full mt-3"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Expected Return Rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="12"
              className="h-10"
            />
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full mt-3"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Investment Period (Years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              className="h-10"
            />
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full mt-3"
            />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Total Invested</div>
              <div className="text-3xl font-bold">${result.totalInvested.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Expected Value</div>
              <div className="text-3xl font-bold">${result.futureValue.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="text-sm text-muted-foreground mb-1">Expected Gains</div>
              <div className="text-3xl font-bold">${result.gains.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Yearly Projection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={result.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `$${(value as number).toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Legend />
                <Bar dataKey="invested" fill="var(--color-primary)" name="Total Invested" />
                <Bar dataKey="value" fill="var(--color-accent)" name="Portfolio Value" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

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
        </div>
      )}
    </div>
  )
}
