import { getCalculatorBySlug } from '@/lib/calculatorData'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

// Dynamically import all calculator components
const calculatorComponents: Record<string, React.ComponentType<any>> = {
  'emi-calculator': dynamic(() => import('@/components/calculators/EMICalculator')),
  'compound-interest': dynamic(() => import('@/components/calculators/CompoundInterestCalculator')),
  'sip-calculator': dynamic(() => import('@/components/calculators/SIPCalculator')),
  'loan-eligibility': dynamic(() => import('@/components/calculators/LoanEligibilityCalculator')),
  'interest-rate-calculator': dynamic(() => import('@/components/calculators/InterestRateCalculator')),
  'loan-comparison': dynamic(() => import('@/components/calculators/LoanComparisonCalculator')),
  'inflation-calculator': dynamic(() => import('@/components/calculators/InflationCalculator')),
  'retirement-calculator': dynamic(() => import('@/components/calculators/RetirementCalculator')),
  'net-worth-calculator': dynamic(() => import('@/components/calculators/NetWorthCalculator')),
  'debt-payoff-calculator': dynamic(() => import('@/components/calculators/DebtPayoffCalculator')),
  'income-tax-calculator': dynamic(() => import('@/components/calculators/IncomeTaxCalculator')),
  'gst-calculator': dynamic(() => import('@/components/calculators/GSTCalculator')),
  'fd-calculator': dynamic(() => import('@/components/calculators/FDCalculator')),
  'rd-calculator': dynamic(() => import('@/components/calculators/RDCalculator')),
  'crorepati-calculator': dynamic(() => import('@/components/calculators/CrorepatiCalculator')),
  'salary-savings-planner': dynamic(() => import('@/components/calculators/SalarySavingsPlanner')),
  'buy-vs-rent': dynamic(() => import('@/components/calculators/BuyVsRentCalculator')),
  'freelancer-income': dynamic(() => import('@/components/calculators/FreelancerIncomeCalculator')),
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const calculator = getCalculatorBySlug(params.slug)

  if (!calculator) {
    return { title: 'Calculator not found' }
  }

  return {
    title: `${calculator.name} - Finance Calculator`,
    description: calculator.description,
  }
}

export default async function CalculatorPage(props: Props) {
  const params = await props.params
  const calculator = getCalculatorBySlug(params.slug)

  if (!calculator) {
    notFound()
  }

  const CalculatorComponent = calculatorComponents[calculator.slug]

  if (!CalculatorComponent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-lg bg-gradient-to-br ${calculator.color}`}>
              {calculator.icon && <calculator.icon className="w-8 h-8 text-white" />}
            </div>
            <div>
              <h1 className="text-4xl font-bold">{calculator.name}</h1>
              <p className="text-muted-foreground mt-1">{calculator.description}</p>
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        <CalculatorComponent />
      </div>
    </div>
  )
}
