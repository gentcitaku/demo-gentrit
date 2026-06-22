'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateInflation } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function InflationCalculator() {
  const [amount, setAmount] = useState('100000')
  const [rate, setRate] = useState('6')
  const [years, setYears] = useState('10')
  const [copied, setCopied] = useState(false)

  const result = amount && rate && years ? calculateInflation(parseInt(amount), parseFloat(rate), parseInt(years)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Inflation Impact:\nPresent Value: $${result.presentValue.toLocaleString()}\nInflation Rate: ${result.inflationRate}%\nYears: ${result.years}\nFuture Value: $${result.futureValue.toLocaleString()}\nPurchasing Power Loss: $${result.purchasingPowerLoss.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Inflation Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Present Value ($)</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Inflation Rate (% p.a.)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <div className="text-sm text-muted-foreground mb-1">Equivalent Future Value</div>
              <div className="text-3xl font-bold">${result.futureValue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-2">At {result.inflationRate}% inflation</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20">
              <div className="text-sm text-muted-foreground mb-1">Purchasing Power Loss</div>
              <div className="text-3xl font-bold">${result.purchasingPowerLoss.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-2">Over {result.years} years</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Impact Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Today&apos;s Buying Power</span>
                <span className="font-semibold">${result.presentValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Future Money Needed</span>
                <span className="font-semibold">${result.futureValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Additional Amount Needed</span>
                <span className="font-semibold">${result.purchasingPowerLoss.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Inflation Impact</span>
                <span className="text-primary font-bold">{((result.purchasingPowerLoss / result.presentValue) * 100).toFixed(1)}%</span>
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
