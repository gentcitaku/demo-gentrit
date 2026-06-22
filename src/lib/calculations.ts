// EMI Calculation: EMI = P * [R * (1+R)^N] / [(1+R)^N - 1]
export function calculateEMI(principal: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 12 / 100
  if (monthlyRate === 0) {
    const emi = principal / months
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(principal),
      totalInterest: 0,
      schedule: generateEMISchedule(principal, annualRate, months, emi),
    }
  }

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(emi * months),
    totalInterest: Math.round(emi * months - principal),
    schedule: generateEMISchedule(principal, annualRate, months, emi),
  }
}

function generateEMISchedule(principal: number, annualRate: number, months: number, emi: number) {
  const monthlyRate = annualRate / 12 / 100
  const schedule = []
  let balance = principal

  for (let i = 1; i <= months; i++) {
    const interest = Math.round(balance * monthlyRate)
    const principalPayment = Math.round(emi - interest)
    balance -= principalPayment

    schedule.push({
      month: i,
      payment: Math.round(emi),
      principal: principalPayment,
      interest,
      balance: Math.max(0, balance),
    })
  }

  return schedule
}

// Compound Interest: A = P(1 + r/n)^(nt)
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  frequency: 1 | 2 | 4 | 12 = 12
) {
  const rate = annualRate / 100
  const amount = principal * Math.pow(1 + rate / frequency, frequency * years)
  const interest = amount - principal

  const yearlyData = []
  for (let year = 0; year <= years; year++) {
    const yearAmount = principal * Math.pow(1 + rate / frequency, frequency * year)
    yearlyData.push({
      year,
      amount: Math.round(yearAmount),
      interest: Math.round(yearAmount - principal),
    })
  }

  return {
    principal,
    finalAmount: Math.round(amount),
    interest: Math.round(interest),
    yearlyData,
  }
}

// SIP Calculation: FV = PMT * [((1 + r)^n - 1) / r]
export function calculateSIP(monthlyAmount: number, annualRate: number, years: number, expectedReturn: number) {
  const months = years * 12
  const monthlyRate = annualRate / 12 / 100
  const returnRate = expectedReturn / 12 / 100

  // Total investment
  const totalInvested = monthlyAmount * months

  // Future value with returns
  const futureValue = monthlyAmount * (Math.pow(1 + returnRate, months) - 1) / returnRate
  const gains = futureValue - totalInvested

  const yearlyData = []
  let cumulativeInvested = 0
  for (let year = 1; year <= years; year++) {
    const monthsElapsed = year * 12
    cumulativeInvested = monthlyAmount * monthsElapsed
    const yearValue = monthlyAmount * (Math.pow(1 + returnRate, monthsElapsed) - 1) / returnRate
    yearlyData.push({
      year,
      invested: Math.round(cumulativeInvested),
      value: Math.round(yearValue),
      gains: Math.round(yearValue - cumulativeInvested),
    })
  }

  return {
    monthlyAmount,
    totalInvested: Math.round(totalInvested),
    futureValue: Math.round(futureValue),
    gains: Math.round(gains),
    yearlyData,
  }
}

// Simple Interest: SI = P * R * T / 100
export function calculateSimpleInterest(principal: number, rate: number, years: number) {
  const interest = (principal * rate * years) / 100
  const amount = principal + interest
  return {
    principal,
    rate,
    years,
    interest: Math.round(interest),
    amount: Math.round(amount),
  }
}

// Loan Eligibility: typically max 50x monthly income
export function calculateLoanEligibility(monthlyIncome: number, existingLiabilities: number = 0) {
  const maxEligible = monthlyIncome * 50
  const afterLiabilities = maxEligible - existingLiabilities
  return {
    monthlyIncome,
    maxEligible: Math.round(maxEligible),
    existingLiabilities: Math.round(existingLiabilities),
    eligibleAmount: Math.max(0, Math.round(afterLiabilities)),
  }
}

// FD Calculator
export function calculateFD(principal: number, annualRate: number, years: number, frequency: 1 | 2 | 4 | 12 = 1) {
  const rate = annualRate / 100
  const amount = principal * Math.pow(1 + rate / frequency, frequency * years)
  const interest = amount - principal

  return {
    principal: Math.round(principal),
    maturityAmount: Math.round(amount),
    interest: Math.round(interest),
    rate: annualRate,
    years,
  }
}

// RD Calculator
export function calculateRD(monthlyAmount: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 12 / 100
  const maturityValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
  const totalInvested = monthlyAmount * months
  const interest = maturityValue - totalInvested

  return {
    monthlyAmount,
    totalInvested: Math.round(totalInvested),
    maturityValue: Math.round(maturityValue),
    interest: Math.round(interest),
  }
}

// Net Worth Calculator
export function calculateNetWorth(assets: Record<string, number>, liabilities: Record<string, number>) {
  const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0)
  const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0)
  const netWorth = totalAssets - totalLiabilities

  return {
    assets,
    totalAssets: Math.round(totalAssets),
    liabilities,
    totalLiabilities: Math.round(totalLiabilities),
    netWorth: Math.round(netWorth),
  }
}

// Income Tax Calculator (Simple - India)
export function calculateIncomeTax(annualIncome: number, deductions: number = 0) {
  const taxableIncome = annualIncome - deductions
  let tax = 0

  if (taxableIncome <= 250000) {
    tax = 0
  } else if (taxableIncome <= 500000) {
    tax = (taxableIncome - 250000) * 0.05
  } else if (taxableIncome <= 1000000) {
    tax = 12500 + (taxableIncome - 500000) * 0.2
  } else {
    tax = 112500 + (taxableIncome - 1000000) * 0.3
  }

  const cess = tax * 0.04
  const totalTax = tax + cess

  return {
    annualIncome: Math.round(annualIncome),
    deductions: Math.round(deductions),
    taxableIncome: Math.round(taxableIncome),
    tax: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    afterTaxIncome: Math.round(annualIncome - totalTax),
  }
}

// GST Calculator
export function calculateGST(amount: number, gstRate: number = 18) {
  const gstAmount = (amount * gstRate) / 100
  const totalAmount = amount + gstAmount

  return {
    baseAmount: Math.round(amount),
    gstRate,
    gstAmount: Math.round(gstAmount),
    totalAmount: Math.round(totalAmount),
  }
}

// Inflation Calculator
export function calculateInflation(presentValue: number, inflationRate: number, years: number) {
  const futureValue = presentValue * Math.pow(1 + inflationRate / 100, years)
  const loss = futureValue - presentValue

  return {
    presentValue: Math.round(presentValue),
    inflationRate,
    years,
    futureValue: Math.round(futureValue),
    purchasingPowerLoss: Math.round(loss),
  }
}

// Retirement Calculator
export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  annualSavings: number,
  expectedReturn: number,
  retirementExpenses: number
) {
  const yearsToRetirement = retirementAge - currentAge
  const rate = expectedReturn / 100
  
  // Calculate savings at retirement
  let corpusSavings = currentSavings * Math.pow(1 + rate, yearsToRetirement)
  const fv = annualSavings * (Math.pow(1 + rate, yearsToRetirement) - 1) / rate
  corpusSavings += fv

  const lifeExpectancy = 85
  const yearsInRetirement = lifeExpectancy - retirementAge
  
  // Calculate needed corpus
  const neededCorpus = retirementExpenses * 12 * yearsInRetirement

  return {
    yearsToRetirement,
    projectedCorpus: Math.round(corpusSavings),
    neededCorpus: Math.round(neededCorpus),
    surplus: Math.round(corpusSavings - neededCorpus),
    isSufficient: corpusSavings >= neededCorpus,
  }
}

// Debt Payoff Calculator
export function calculateDebtPayoff(totalDebt: number, monthlyPayment: number, annualRate: number) {
  const monthlyRate = annualRate / 12 / 100
  const months = Math.log(monthlyPayment / (monthlyPayment - totalDebt * monthlyRate)) / Math.log(1 + monthlyRate)
  const totalPaid = monthlyPayment * months
  const interest = totalPaid - totalDebt

  return {
    totalDebt: Math.round(totalDebt),
    monthlyPayment: Math.round(monthlyPayment),
    months: Math.ceil(months),
    years: (Math.ceil(months) / 12).toFixed(1),
    totalPaid: Math.round(totalPaid),
    totalInterest: Math.round(interest),
  }
}

// Crorepati Goal Calculator
export function calculateCrorepatiGoal(currentSavings: number, monthlyInvestment: number, annualReturn: number) {
  const targetAmount = 10000000 // 1 crore
  const monthlyRate = annualReturn / 12 / 100
  
  // Time to reach target from current savings
  const growthFactor = currentSavings * Math.pow(1 + monthlyRate, 1)
  
  let balance = currentSavings
  let months = 0
  while (balance < targetAmount && months < 600) {
    balance = balance * (1 + monthlyRate) + monthlyInvestment
    months++
  }

  return {
    currentSavings: Math.round(currentSavings),
    monthlyInvestment: Math.round(monthlyInvestment),
    targetAmount,
    monthsNeeded: months,
    yearsNeeded: (months / 12).toFixed(1),
    isAchievable: months <= 600,
  }
}
