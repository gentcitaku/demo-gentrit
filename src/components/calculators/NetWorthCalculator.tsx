'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check } from 'lucide-react'

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState({
    cash: 500000,
    savings: 1000000,
    investments: 2000000,
    home: 5000000,
    vehicles: 1500000,
  })
  const [liabilities, setLiabilities] = useState({
    mortgage: 2000000,
    carLoan: 500000,
    creditCard: 100000,
  })
  const [copied, setCopied] = useState(false)

  const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0)
  const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0)
  const netWorth = totalAssets - totalLiabilities

  const handleCopy = () => {
    const text = `Net Worth Report:\nTotal Assets: $${totalAssets.toLocaleString()}\nTotal Liabilities: $${totalLiabilities.toLocaleString()}\nNet Worth: $${netWorth.toLocaleString()}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Assets */}
        <Card className="p-6 border-border/50">
          <h2 className="text-xl font-bold mb-6">Assets</h2>
          <div className="space-y-4">
            {Object.entries(assets).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0">
                <label className="text-sm capitalize">{key}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setAssets({ ...assets, [key]: parseInt(e.target.value) || 0 })}
                  className="w-32 px-2 py-1 text-right bg-muted rounded border border-border text-sm"
                />
              </div>
            ))}
            <div className="pt-4 border-t border-primary/30 flex justify-between font-bold text-lg">
              <span>Total Assets</span>
              <span className="text-primary">${totalAssets.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Liabilities */}
        <Card className="p-6 border-border/50">
          <h2 className="text-xl font-bold mb-6">Liabilities</h2>
          <div className="space-y-4">
            {Object.entries(liabilities).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0">
                <label className="text-sm capitalize">{key}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setLiabilities({ ...liabilities, [key]: parseInt(e.target.value) || 0 })}
                  className="w-32 px-2 py-1 text-right bg-muted rounded border border-border text-sm"
                />
              </div>
            ))}
            <div className="pt-4 border-t border-red-500/30 flex justify-between font-bold text-lg">
              <span>Total Liabilities</span>
              <span className="text-red-500">${totalLiabilities.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Net Worth Summary */}
      <Card className="p-8 border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Net Worth</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">Assets</div>
            <div className="text-2xl font-bold">${(totalAssets / 100000).toFixed(2)}L</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">Liabilities</div>
            <div className="text-2xl font-bold">${(totalLiabilities / 100000).toFixed(2)}L</div>
          </div>
          <div className={`text-center p-4 rounded-lg ${netWorth >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            <div className="text-sm text-muted-foreground">Net Worth</div>
            <div className={`text-2xl font-bold ${netWorth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${(netWorth / 100000).toFixed(2)}L
            </div>
          </div>
        </div>

        <Button onClick={handleCopy} className="w-full bg-gradient-to-r from-primary to-accent">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Results'}
        </Button>
      </Card>
    </div>
  )
}
