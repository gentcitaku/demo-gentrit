'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateLoanEligibility } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function LoanEligibilityCalculator() {
  const [income, setIncome] = useState('50000')
  const [liabilities, setLiabilities] = useState('100000')
  const [copied, setCopied] = useState(false)

  const result = income ? calculateLoanEligibility(parseInt(income), parseInt(liabilities) || 0) : null

  const handleCopy = () => {
    if (result) {
      const text = `Loan Eligibility Report:\nMonthly Income: $${result.monthlyIncome.toLocaleString()}\nMax Eligible: $${result.maxEligible.toLocaleString()}\nExisting Liabilities: $${result.existingLiabilities.toLocaleString()}\nEligible Amount: $${result.eligibleAmount.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Income Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="50000"
              className="h-10"
            />
            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full mt-3"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Existing Liabilities ($)</Label>
            <Input
              type="number"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              placeholder="0"
              className="h-10"
            />
            <input
              type="range"
              min="0"
              max="10000000"
              step="50000"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              className="w-full mt-3"
            />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Max Eligible Amount</div>
              <div className="text-3xl font-bold">${result.maxEligible.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-2">(50x monthly income)</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Final Eligible Amount</div>
              <div className="text-3xl font-bold">${result.eligibleAmount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-2">After existing liabilities</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Eligibility Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-muted-foreground">Monthly Income</span>
                <span className="font-semibold">${result.monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-muted-foreground">Max Eligibility (50x)</span>
                <span className="font-semibold">${result.maxEligible.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-muted-foreground">Existing Liabilities</span>
                <span className="font-semibold">${result.existingLiabilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Loan Eligible</span>
                <span className="text-xl font-bold text-primary">${result.eligibleAmount.toLocaleString()}</span>
              </div>
            </div>
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
