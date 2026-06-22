'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateCompoundInterest } from '@/lib/calculations'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Copy, Check } from 'lucide-react'

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('10')
  const [copied, setCopied] = useState(false)

  const result = principal && rate && years ? calculateCompoundInterest(parseInt(principal), parseFloat(rate), parseInt(years)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Compound Interest Calculator:\nPrincipal: $${result.principal.toLocaleString()}\nRate: ${rate}%\nYears: ${years}\nFinal Amount: $${result.finalAmount.toLocaleString()}\nInterest Earned: $${result.interest.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Investment Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Initial Investment ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="100000"
              className="h-10"
            />
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full mt-3"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Annual Interest Rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="8"
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

          <div>
            <Label className="text-sm font-medium mb-2 block">Time Period (Years)</Label>
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
              max="50"
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
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Final Amount</div>
              <div className="text-3xl font-bold">${result.finalAmount.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Interest Earned</div>
              <div className="text-3xl font-bold">${result.interest.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="text-sm text-muted-foreground mb-1">Return Multiple</div>
              <div className="text-3xl font-bold">{(result.finalAmount / result.principal).toFixed(2)}x</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Growth Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={result.yearlyData}>
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
                <Line type="monotone" dataKey="amount" stroke="var(--color-primary)" name="Total Amount" strokeWidth={2} />
                <Line type="monotone" dataKey="interest" stroke="var(--color-accent)" name="Interest Earned" strokeWidth={2} />
              </LineChart>
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
