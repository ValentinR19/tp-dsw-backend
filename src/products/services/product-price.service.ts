// src/modules/product/services/product-price.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ProductPriceHistoryRepository } from '../repositories/product-price-history.repository';
import { ProductPriceRepository } from '../repositories/product-price.repository';
import { ProductPrice } from '@product-module/models/classes/product-price.entity';
@Injectable()
export class ProductPriceService {
  constructor(
    private readonly priceRepository: ProductPriceRepository,
    private readonly priceHistoryRepository: ProductPriceHistoryRepository,
  ) {}
      async findByProductId(productId: number, manager?: EntityManager): Promise<ProductPrice | null> {
        return await this.priceRepository.findByProductId(productId, manager);
    }
  async setPriceWithHistory(
    params: {
      productId: number;
      price: number;
      currency?: string;
    },
    manager?: EntityManager,
  ): Promise<void> {
    const { productId, price, currency = 'ARS' } = params;

    const existingPrice = await this.priceRepository.findByProductId(productId, manager);

    if (!existingPrice) {
      await this.priceRepository.save({ productId, price, currency }, manager);

      await this.priceHistoryRepository.save({ productId, price, currency }, manager);

      return;
    }

    const priceChanged = existingPrice.price !== price || existingPrice.currency !== currency;

    if (priceChanged) {
      await this.priceRepository.save({ id: existingPrice.id, productId, price, currency }, manager);

      await this.priceHistoryRepository.save({ productId, price, currency }, manager);
    }
  }
}
