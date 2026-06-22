'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check } from 'lucide-react'

export default function FreelancerIncomeCalculator() {
  const [hourlyRate, setHourlyRate] = useState('500')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [weeksPerYear, setWeeksPerYear] = useState('48')
  const [expenses, setExpenses] = useState('100000')
  const [taxRate, setTaxRate] = useState('20')
  const [copied, setCopied] = useState(false)

  const grossAnnual = parseInt(hourlyRate) * parseInt(hoursPerWeek) * parseInt(weeksPerYear)
  const tax = (grossAnnual * parseInt(taxRate)) / 100
  const netIncome = grossAnnual - tax - parseInt(expenses)
  const monthlyNet = netIncome / 12

  const handleCopy = () => {
    const text = `Freelancer Income Report:\nHourly Rate: $${parseInt(hourlyRate).toLocaleString()}\nGross Annual Income: $${grossAnnual.toLocaleString()}\nTaxes: $${tax.toLocaleString('en-IN', {maximumFractionDigits: 0})}\nAnnual Expenses: $${parseInt(expenses).toLocaleString()}\nNet Annual Income: $${netIncome.toLocaleString('en-IN', {maximumFractionDigits: 0})}\nNet Monthly Income: $${monthlyNet.toLocaleString('en-IN', {maximumFractionDigits: 0})}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Income Details</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Hourly Rate ($)</Label>
            <Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Hours per Week</Label>
            <Input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Weeks per Year</Label>
            <Input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Annual Expenses ($)</Label>
            <Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Estimated Tax Rate (%)</Label>
            <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="text-sm text-muted-foreground mb-1">Gross Annual Income</div>
            <div className="text-3xl font-bold">${grossAnnual.toLocaleString()}</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="text-sm text-muted-foreground mb-1">Net Monthly Income</div>
            <div className="text-3xl font-bold">${monthlyNet.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
          </Card>
        </div>

        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold mb-4">Income Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between pb-3 border-b border-border/50">
              <div>
                <div className="text-muted-foreground text-sm">Hourly Rate</div>
                <div className="font-semibold">${parseInt(hourlyRate).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Hours/Week</div>
                <div className="font-semibold">{hoursPerWeek}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Weeks/Year</div>
                <div className="font-semibold">{weeksPerYear}</div>
              </div>
            </div>

            <div className="flex justify-between pb-3 border-b border-border/50">
              <span className="text-muted-foreground">Gross Annual Income</span>
              <span className="font-semibold">${grossAnnual.toLocaleString()}</span>
            </div>

            <div className="flex justify-between pb-3 border-b border-border/50">
              <span className="text-muted-foreground">Taxes ({taxRate}%)</span>
              <span className="font-semibold text-red-500">-${tax.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
            </div>

            <div className="flex justify-between pb-3 border-b border-border/50">
              <span className="text-muted-foreground">Annual Expenses</span>
              <span className="font-semibold text-red-500">-${parseInt(expenses).toLocaleString()}</span>
            </div>

            <div className="flex justify-between pt-2 bg-muted/50 p-3 rounded-lg">
              <span className="font-semibold">Net Annual Income</span>
              <span className="text-primary font-bold">${netIncome.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
            </div>

            <div className="flex justify-between pt-2 bg-primary/10 p-3 rounded-lg border border-primary/30">
              <span className="font-semibold">Net Monthly Income</span>
              <span className="text-primary font-bold">${monthlyNet.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
            </div>
          </div>
        </Card>

        <Button onClick={handleCopy} className="w-full bg-gradient-to-r from-primary to-accent">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Results'}
        </Button>
      </div>
    </div>
  )
}
