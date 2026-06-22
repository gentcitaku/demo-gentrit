'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check } from 'lucide-react'

export default function SalarySavingsPlanner() {
  const [salary, setSalary] = useState('100000')
  const [expenses, setExpenses] = useState('70000')
  const [copied, setCopied] = useState(false)

  const savings = Math.max(0, parseInt(salary) - parseInt(expenses))
  const savingsRate = parseInt(salary) > 0 ? ((savings / parseInt(salary)) * 100).toFixed(1) : 0

  const handleCopy = () => {
    const text = `Salary Savings Plan:\nMonthly Salary: $${parseInt(salary).toLocaleString()}\nMonthly Expenses: $${parseInt(expenses).toLocaleString()}\nMonthly Savings: $${savings.toLocaleString()}\nSavings Rate: ${savingsRate}%\nAnnual Savings: $${(savings * 12).toLocaleString()}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50">
          <h2 className="text-xl font-bold mb-6">Monthly Income & Expenses</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Monthly Salary ($)</Label>
              <Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="h-10" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Monthly Expenses ($)</Label>
              <Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="h-10" />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="text-sm text-muted-foreground mb-1">Monthly Savings</div>
            <div className="text-4xl font-bold">${savings.toLocaleString()}</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="text-sm text-muted-foreground mb-1">Savings Rate</div>
            <div className="text-4xl font-bold">{savingsRate}%</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <div className="text-sm text-muted-foreground mb-1">Annual Savings</div>
            <div className="text-4xl font-bold">${(savings * 12).toLocaleString()}</div>
          </Card>
        </div>
      </div>

      <Card className="p-6 border-border/50">
        <h3 className="text-lg font-semibold mb-6">Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <div>
              <div className="text-muted-foreground text-sm">Monthly Salary</div>
              <div className="font-semibold">${parseInt(salary).toLocaleString()}</div>
            </div>
            <div className="text-2xl font-bold text-primary">100%</div>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <div>
              <div className="text-muted-foreground text-sm">Monthly Expenses</div>
              <div className="font-semibold">${parseInt(expenses).toLocaleString()}</div>
            </div>
            <div className="text-2xl font-bold text-red-500">
              {parseInt(salary) > 0 ? ((parseInt(expenses) / parseInt(salary)) * 100).toFixed(1) : 0}%
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 bg-muted/50 p-4 rounded-lg">
            <div>
              <div className="text-muted-foreground text-sm">Monthly Savings</div>
              <div className="font-semibold">${savings.toLocaleString()}</div>
            </div>
            <div className="text-2xl font-bold text-green-500">{savingsRate}%</div>
          </div>
        </div>
      </Card>

      <Button onClick={handleCopy} className="w-full bg-gradient-to-r from-primary to-accent h-12">
        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
        {copied ? 'Copied!' : 'Copy Results'}
      </Button>
    </div>
  )
}
