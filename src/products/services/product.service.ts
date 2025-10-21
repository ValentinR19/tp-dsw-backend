import { Injectable, Logger } from '@nestjs/common';
import { Product } from '@product-module/models/classes/product.entity';
import { CreateProductDto } from '@product-module/models/dtos/create-product.dto';
import { UpdateProductDto } from '@product-module/models/dtos/update-product.dto';
import { ProductRepository } from '@product-module/repositories/product.repository';
import { ProductPriceService } from '@product-module/services/product-price.service';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class ProductService {
  private readonly logger: Logger = new Logger(ProductService.name);

  constructor(
    private readonly datasource: DataSource,
    private readonly productRepository: ProductRepository,
    private readonly priceService: ProductPriceService,
  ) {}

  async findById(id: number): Promise<Product | null> {
    try {
      return await this.productRepository.findById(id);
    } catch (error) {
      throw new NotFoundErrorException(Product.name, error);
    }
  }

  async search(pageNumber: number, dto: PaginatedQueryDTO<Product>): Promise<IPaginated<Product>> {
    const { results, filters, global } = dto;

    return await this.productRepository.search(pageNumber, results, filters, global);
  }

  async delete(id: number): Promise<void> {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw new NotSavedErrorException(Product.name, error);
    }
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.log(`Creating product: ${JSON.stringify(dto)}`);
      const product: Partial<Product> = { name: dto.name, description: dto.description, productCategoryId: dto.productCategoryId };
      const savedProduct = await this.save(product, queryRunner.manager);

      if (dto.price) {
        await this.priceService.setPriceWithHistory(
          {
            productId: savedProduct.id,
            price: dto.price,
            currency: dto.currency,
          },
          queryRunner.manager,
        );
      }
      await queryRunner.commitTransaction();
      return savedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error creating product: ${error}`);

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.productRepository.findById(id, queryRunner.manager);

      const updatedProduct: Partial<Product> = {
        id,
        name: dto.name,
        description: dto.description,
        productCategoryId: dto.productCategoryId,
      };

      const savedProduct = await this.productRepository.save(updatedProduct, queryRunner.manager);

      if (dto.price) {
        await this.priceService.setPriceWithHistory(
          {
            productId: id,
            price: dto.price,
            currency: dto.currency,
          },
          queryRunner.manager,
        );
      }

      await queryRunner.commitTransaction();

      return savedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error updating product ${id}: ${error}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async save(product: Partial<Product>, manager?: EntityManager): Promise<Product> {
    try {
      this.logger.log(`Saving product: ${JSON.stringify(product)}`);
      const savedProduct = await this.productRepository.save(product, manager);
      this.logger.log(`Product saved: ${JSON.stringify(savedProduct)}`);
      return savedProduct;
    } catch (error) {
      throw new NotSavedErrorException(Product.name, error);
    }
  }
}
