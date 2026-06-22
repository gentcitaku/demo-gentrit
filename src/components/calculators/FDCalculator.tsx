'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateFD } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function FDCalculator() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('6')
  const [years, setYears] = useState('5')
  const [copied, setCopied] = useState(false)

  const result = principal && rate && years ? calculateFD(parseInt(principal), parseFloat(rate), parseInt(years)) : null

  const handleCopy = () => {
    if (result) {
      const text = `FD Calculator:\nPrincipal: $${result.principal.toLocaleString()}\nRate: ${result.rate}% p.a.\nTenure: ${result.years} years\nMaturity Amount: $${result.maturityAmount.toLocaleString()}\nInterest: $${result.interest.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">FD Details</h2>
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
            <Label className="text-sm font-medium mb-2 block">Tenure (Years)</Label>
            <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Principal</div>
              <div className="text-3xl font-bold">${result.principal.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Interest Earned</div>
              <div className="text-3xl font-bold">${result.interest.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="text-sm text-muted-foreground mb-1">Maturity Amount</div>
              <div className="text-3xl font-bold">${result.maturityAmount.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Principal Amount</span>
                <span className="font-semibold">${result.principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Interest Rate</span>
                <span className="font-semibold">{result.rate}% p.a.</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Tenure</span>
                <span className="font-semibold">{result.years} years</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Maturity Amount</span>
                <span className="text-primary font-bold">${result.maturityAmount.toLocaleString()}</span>
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
