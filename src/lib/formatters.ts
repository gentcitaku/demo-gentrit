/**
 * Format number as Indian currency ($)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format number with Indian number system (commas)
 */
export function formatNumber(value: number | string): string {
  const num = typeof value === 'string' ? parseInt(value) : value
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format percentage with 2 decimal places
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format large numbers with abbreviations (1K, 1M, 1B)
 */
export function formatCompact(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M'
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K'
  }
  return value.toString()
}
