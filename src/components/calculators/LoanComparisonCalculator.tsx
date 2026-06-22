'use client'

import { Card } from '@/components/ui/card'

export default function LoanComparisonCalculator() {
  return (
    <Card className="p-8 border-border/50 text-center">
      <h2 className="text-2xl font-bold mb-4">Loan Comparison Calculator</h2>
      <p className="text-muted-foreground mb-6">Compare multiple loan offers to find the best option</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Loan Option 1</h3>
          <p className="text-sm text-muted-foreground">Rate: 7% | EMI: $10,000</p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Loan Option 2</h3>
          <p className="text-sm text-muted-foreground">Rate: 8% | EMI: $10,500</p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Loan Option 3</h3>
          <p className="text-sm text-muted-foreground">Rate: 9% | EMI: $11,000</p>
        </div>
      </div>
    </Card>
  )
}
