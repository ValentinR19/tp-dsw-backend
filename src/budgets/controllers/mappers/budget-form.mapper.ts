import { Budget } from '@budgets-module/models/classes/budget.entity';

export class BudgetFormMapper {
  static toForm(budget: Budget) {
    return {
      code: budget.code,
      saleNumber: budget.saleNumber,
      subtotal: budget.subtotal,
      totalDiscount: budget.totalDiscount,
      totalTax: budget.totalTax,
      total: budget.total,
      customerId: budget.customer?.id,
      sellerId: budget.seller?.id,
      statusId: budget.status?.id,
      customer: budget.customer,
      seller: budget.seller,
      status: budget.status,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,

      items: budget.items?.map((item) => {
        const unitPrice = Number(item.unitPrice) || 0;
        const quantity = Number(item.quantity) || 0;
        const discount = Number(item.discount) || 0;

        const discountPercent = quantity && unitPrice ? Math.min(100, (discount / (unitPrice * quantity)) * 100) : 0;

        return {
          productId: item.product?.id,
          productName: item.product?.name,
          quantity,
          unitPrice,
          discount,
          discountPercent: isNaN(discountPercent) ? 0 : discountPercent,
          tax: item.tax ?? 0,
          totalLine: item.totalLine ?? unitPrice * quantity - discount + (item.tax ? item.tax * unitPrice * quantity : 0),
        };
      }),

      budgetShipping: budget.budgetShipping
        ? {
            address: budget.budgetShipping.address,
            cityId: budget.budgetShipping.city,
            stateId: budget.budgetShipping.state,
            countryId: budget.budgetShipping.country,
          }
        : undefined,

      budgetBilling: budget.budgetBilling
        ? {
            buyerCompany: budget.budgetBilling.buyerCompany,
            buyerAddress: budget.budgetBilling.buyerAddress,
            buyerTaxId: budget.budgetBilling.buyerTaxId,
            shippingCountry: budget.budgetBilling.shippingCountry,
            //consigneeAdress: budget.budgetBilling.consigneeAddress,
            portDestination: budget.budgetBilling.portDestination,
            paymentDescription: budget.budgetBilling.paymentDescription,
          }
        : undefined,
    };
  }
}
