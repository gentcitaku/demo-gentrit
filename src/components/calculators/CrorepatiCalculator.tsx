'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateCrorepatiGoal } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function CrorepatiCalculator() {
  const [current, setCurrent] = useState('100000')
  const [monthly, setMonthly] = useState('10000')
  const [rate, setRate] = useState('12')
  const [copied, setCopied] = useState(false)

  const result = current && monthly && rate ? calculateCrorepatiGoal(parseInt(current), parseInt(monthly), parseFloat(rate)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Crorepati Goal Plan:\nCurrent Savings: $${result.currentSavings.toLocaleString()}\nMonthly Investment: $${result.monthlyInvestment.toLocaleString()}\nTime to 1 Crore: ${result.yearsNeeded} years\nMonths Needed: ${result.monthsNeeded}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Goal Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Current Savings ($)</Label>
            <Input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Investment ($)</Label>
            <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Expected Return Rate (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-lg border-2 ${result.isAchievable ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <h3 className="text-lg font-semibold mb-4">Target: $1 Crore</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time Needed</span>
                <span className="font-bold text-2xl">{result.yearsNeeded} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">({result.monthsNeeded} months)</span>
                <span className={result.isAchievable ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                  {result.isAchievable ? 'Achievable' : 'Needs Adjustment'}
                </span>
              </div>
            </div>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Plan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Current Savings</span>
                <span className="font-semibold">${result.currentSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Monthly Investment</span>
                <span className="font-semibold">${result.monthlyInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Target Amount</span>
                <span className="font-semibold">${result.targetAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Years to Target</span>
                <span className="text-primary font-bold">{result.yearsNeeded}</span>
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
