export function generateSaleNumber(budgetId: number, sellerId: number, date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const paddedSeller = sellerId.toString().padStart(4, '0');
  const paddedBudget = budgetId.toString().padStart(5, '0');

  return `SALE-${year}-${month}-${paddedSeller}-${paddedBudget}`;
}
