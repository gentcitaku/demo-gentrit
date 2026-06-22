'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateDebtPayoff } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function DebtPayoffCalculator() {
  const [debt, setDebt] = useState('100000')
  const [payment, setPayment] = useState('2000')
  const [rate, setRate] = useState('12')
  const [copied, setCopied] = useState(false)

  const result = debt && payment && rate ? calculateDebtPayoff(parseInt(debt), parseInt(payment), parseFloat(rate)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Debt Payoff Plan:\nTotal Debt: $${result.totalDebt.toLocaleString()}\nMonthly Payment: $${result.monthlyPayment.toLocaleString()}\nPayoff Time: ${result.years} years\nTotal Interest: $${result.totalInterest.toLocaleString()}\nTotal Paid: $${result.totalPaid.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Debt Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Total Debt ($)</Label>
            <Input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Payment ($)</Label>
            <Input type="number" value={payment} onChange={(e) => setPayment(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Interest Rate (% p.a.)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Payoff Time</div>
              <div className="text-3xl font-bold">{result.years}</div>
              <div className="text-xs text-muted-foreground mt-2">{result.months} months</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Total Interest Paid</div>
              <div className="text-3xl font-bold">${result.totalInterest.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Payoff Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Total Debt</span>
                <span className="font-semibold">${result.totalDebt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Monthly Payment</span>
                <span className="font-semibold">${result.monthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Total Months</span>
                <span className="font-semibold">{result.months}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Total Interest</span>
                <span className="font-semibold">${result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Total Amount Paid</span>
                <span className="text-primary font-bold">${result.totalPaid.toLocaleString()}</span>
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
