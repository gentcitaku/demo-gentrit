'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateRD } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function RDCalculator() {
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('6')
  const [months, setMonths] = useState('60')
  const [copied, setCopied] = useState(false)

  const result = monthly && rate ? calculateRD(parseInt(monthly), parseFloat(rate), parseInt(months)) : null

  const handleCopy = () => {
    if (result) {
      const text = `RD Calculator:\nMonthly: $${result.monthlyAmount.toLocaleString()}\nTotal Invested: $${result.totalInvested.toLocaleString()}\nInterest: $${result.interest.toLocaleString()}\nMaturity Value: $${result.maturityValue.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">RD Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Amount ($)</Label>
            <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Interest Rate (% p.a.)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Duration (Months)</Label>
            <Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className="h-10" />
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
              <div className="text-sm text-muted-foreground mb-1">Interest Earned</div>
              <div className="text-3xl font-bold">${result.interest.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="text-sm text-muted-foreground mb-1">Maturity Value</div>
              <div className="text-3xl font-bold">${result.maturityValue.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Monthly Amount</span>
                <span className="font-semibold">${result.monthlyAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Duration</span>
                <span className="font-semibold">{parseInt(months)} months</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Total Invested</span>
                <span className="font-semibold">${result.totalInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Maturity Value</span>
                <span className="text-primary font-bold">${result.maturityValue.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Button onClick={handleCopy} className="w-full bg-gradient-to-r from-primary to-accent">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy Results'}
          </Button>
        </div>
      )}
    </div>
  )
}
