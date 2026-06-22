'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateGST } from '@/lib/calculations'
import { Copy, Check } from 'lucide-react'

export default function GSTCalculator() {
  const [amount, setAmount] = useState('10000')
  const [rate, setRate] = useState('18')
  const [copied, setCopied] = useState(false)

  const result = amount ? calculateGST(parseInt(amount), parseInt(rate)) : null

  const handleCopy = () => {
    if (result) {
      const text = `GST Calculation:\nBase Amount: $${result.baseAmount.toLocaleString()}\nGST Rate: ${result.gstRate}%\nGST Amount: $${result.gstAmount.toLocaleString()}\nTotal Amount: $${result.totalAmount.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Amount & Rate</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Base Amount ($)</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">GST Rate (%)</Label>
            <select value={rate} onChange={(e) => setRate(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background">
              <option value="5">5% - Essential Items</option>
              <option value="12">12% - General Goods</option>
              <option value="18">18% - Standard Rate</option>
              <option value="28">28% - Luxury Items</option>
            </select>
          </div>
        </div>
      </Card>

      {result && (
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="text-sm text-muted-foreground mb-1">Base Amount</div>
              <div className="text-3xl font-bold">${result.baseAmount.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <div className="text-sm text-muted-foreground mb-1">GST Amount</div>
              <div className="text-3xl font-bold">${result.gstAmount.toLocaleString()}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
              <div className="text-3xl font-bold">${result.totalAmount.toLocaleString()}</div>
            </Card>
          </div>

          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Base Amount</span>
                <span className="font-semibold">${result.baseAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">GST Rate</span>
                <span className="font-semibold">{result.gstRate}%</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/50">
                <span className="text-muted-foreground">GST Amount</span>
                <span className="font-semibold">${result.gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
                <span className="font-semibold">Total (Inc. GST)</span>
                <span className="text-primary font-bold">${result.totalAmount.toLocaleString()}</span>
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
