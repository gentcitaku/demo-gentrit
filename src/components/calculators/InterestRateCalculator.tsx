'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateSimpleInterest } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function InterestRateCalculator() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('5')
  const [copied, setCopied] = useState(false)

  const result = principal && rate && years ? calculateSimpleInterest(parseInt(principal), parseFloat(rate), parseFloat(years)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Interest Calculation:\nPrincipal: $${result.principal.toLocaleString()}\nRate: ${result.rate}%\nYears: ${result.years}\nSimple Interest: $${result.interest.toLocaleString()}\nTotal Amount: $${result.amount.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Loan Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Principal Amount ($)</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Interest Rate (% p.a.)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Time Period (Years)</Label>
            <Input type="number" step="0.1" value={years} onChange={(e) => setYears(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Simple Interest</div>
              <div className="text-3xl font-bold">${result.interest.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
              <div className="text-3xl font-bold">${result.amount.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="text-sm text-muted-foreground mb-1">Interest %</div>
              <div className="text-3xl font-bold">{((result.interest / result.principal) * 100).toFixed(1)}%</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Calculation Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Formula</span>
                <span>SI = (P × R × T) / 100</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Principal (P)</span>
                <span className="font-semibold">${result.principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Rate (R)</span>
                <span className="font-semibold">{result.rate}% p.a.</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Time (T)</span>
                <span className="font-semibold">{result.years} years</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Simple Interest</span>
                <span className="text-primary font-bold">${result.interest.toLocaleString()}</span>
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
