'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateIncomeTax } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState('1000000')
  const [deductions, setDeductions] = useState('150000')
  const [copied, setCopied] = useState(false)

  const result = income ? calculateIncomeTax(parseInt(income), parseInt(deductions) || 0) : null

  const handleCopy = () => {
    if (result) {
      const text = `Income Tax Report:\nAnnual Income: $${result.annualIncome.toLocaleString()}\nDeductions: $${result.deductions.toLocaleString()}\nTaxable Income: $${result.taxableIncome.toLocaleString()}\nIncome Tax: $${result.tax.toLocaleString()}\nCess: $${result.cess.toLocaleString()}\nTotal Tax: $${result.totalTax.toLocaleString()}\nAfter Tax Income: $${result.afterTaxIncome.toLocaleString()}`
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
            <Label className="text-sm font-medium mb-2 block">Annual Income ($)</Label>
            <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Deductions (80C, etc) ($)</Label>
            <Input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Total Tax</div>
              <div className="text-3xl font-bold">${result.totalTax.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">After Tax Income</div>
              <div className="text-3xl font-bold">${result.afterTaxIncome.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Tax Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Annual Income</span>
                <span className="font-semibold">${result.annualIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Deductions (80C, etc)</span>
                <span className="font-semibold">${result.deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Taxable Income</span>
                <span className="font-semibold">${result.taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Income Tax (Slab)</span>
                <span className="font-semibold">${result.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span>Health & Education Cess (4%)</span>
                <span className="font-semibold">${result.cess.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Total Tax Liability</span>
                <span className="text-primary font-bold">${result.totalTax.toLocaleString()}</span>
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
