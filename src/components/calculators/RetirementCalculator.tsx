'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateRetirement } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('35')
  const [retirementAge, setRetirementAge] = useState('60')
  const [savings, setSavings] = useState('500000')
  const [annualSavings, setAnnualSavings] = useState('300000')
  const [expectedReturn, setExpectedReturn] = useState('9')
  const [expenses, setExpenses] = useState('50000')
  const [copied, setCopied] = useState(false)

  const result = currentAge && retirementAge ? calculateRetirement(
    parseInt(currentAge),
    parseInt(retirementAge),
    parseInt(savings),
    parseInt(annualSavings),
    parseFloat(expectedReturn),
    parseInt(expenses)
  ) : null

  const handleCopy = () => {
    if (result) {
      const text = `Retirement Plan:\nYears to Retirement: ${result.yearsToRetirement}\nProjected Corpus: $${result.projectedCorpus.toLocaleString()}\nNeeded Corpus: $${result.neededCorpus.toLocaleString()}\nSurplus/Deficit: $${result.surplus.toLocaleString()}\nStatus: ${result.isSufficient ? 'Sufficient' : 'Insufficient'}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Personal Details</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Current Age</Label>
            <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Retirement Age</Label>
            <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Current Savings ($)</Label>
            <Input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Annual Savings ($)</Label>
            <Input type="number" value={annualSavings} onChange={(e) => setAnnualSavings(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Expected Return Rate (%)</Label>
            <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Expenses ($)</Label>
            <Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-lg border-2 ${result.isSufficient ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <h3 className="text-lg font-semibold mb-4">{result.isSufficient ? 'Retirement Goal on Track ✓' : 'Shortfall Alert'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projected Corpus</span>
                <span className="font-bold text-xl">${result.projectedCorpus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Required Corpus</span>
                <span className="font-bold text-xl">${result.neededCorpus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border/30">
                <span className="font-semibold">Surplus</span>
                <span className={`font-bold text-xl ${result.surplus >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${result.surplus.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Current Age</span>
                <span className="font-semibold">{currentAge}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Retirement Age</span>
                <span className="font-semibold">{retirementAge}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Years to Retirement</span>
                <span className="text-primary font-bold">{result.yearsToRetirement}</span>
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
