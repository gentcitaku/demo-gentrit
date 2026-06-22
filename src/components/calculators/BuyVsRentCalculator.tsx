'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check } from 'lucide-react'

export default function BuyVsRentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('5000000')
  const [downPayment, setDownPayment] = useState('1000000')
  const [loanRate, setLoanRate] = useState('7')
  const [tenure, setTenure] = useState('20')
  const [rent, setRent] = useState('30000')
  const [rentIncrease, setRentIncrease] = useState('5')
  const [copied, setCopied] = useState(false)

  const loanAmount = parseInt(propertyPrice) - parseInt(downPayment)
  const monthlyRate = parseFloat(loanRate) / 12 / 100
  const months = parseInt(tenure) * 12
  const emi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  
  const totalBuyingCost = parseInt(downPayment) + (emi * months)
  const totalRentingCost = parseInt(rent) * months + (parseInt(rent) * parseInt(rentIncrease) / 100 * months * months / 2 / 12)

  const handleCopy = () => {
    const text = `Buy vs Rent Analysis:\nMonthly EMI: $${emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}\nMonthly Rent: $${parseInt(rent).toLocaleString()}\nTotal Buying Cost: $${totalBuyingCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}\nTotal Renting Cost: $${totalRentingCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}\nBetter Option: ${totalBuyingCost < totalRentingCost ? 'Buying' : 'Renting'}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isBuyingBetter = totalBuyingCost < totalRentingCost

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 p-6 border-border/50">
        <h2 className="text-xl font-bold mb-6">Buying Details</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Property Price ($)</Label>
            <Input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Down Payment ($)</Label>
            <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Loan Rate (% p.a.)</Label>
            <Input type="number" step="0.1" value={loanRate} onChange={(e) => setLoanRate(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Tenure (Years)</Label>
            <Input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="h-10" />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-6">Renting Details</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Monthly Rent ($)</Label>
            <Input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Annual Increase (%)</Label>
            <Input type="number" step="0.1" value={rentIncrease} onChange={(e) => setRentIncrease(e.target.value)} className="h-10" />
          </div>
        </div>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
            <div className="text-3xl font-bold">${emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <div className="text-sm text-muted-foreground mb-1">Monthly Rent</div>
            <div className="text-3xl font-bold">${parseInt(rent).toLocaleString()}</div>
          </Card>
        </div>

        <Card className={`p-6 border-2 ${isBuyingBetter ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <h3 className="text-lg font-semibold mb-4">{isBuyingBetter ? 'Buying is Better' : 'Renting is Better'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Total Buying Cost</div>
              <div className="text-2xl font-bold">${totalBuyingCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Total Renting Cost</div>
              <div className="text-2xl font-bold">${totalRentingCost.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="text-sm text-muted-foreground mb-1">Savings by choosing the better option</div>
            <div className="text-2xl font-bold text-primary">
              ${Math.abs(totalBuyingCost - totalRentingCost).toLocaleString('en-IN', {maximumFractionDigits: 0})}
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
