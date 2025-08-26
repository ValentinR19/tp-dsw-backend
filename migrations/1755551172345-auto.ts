import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1755551172345 implements MigrationInterface {
    name = 'Auto1755551172345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_name\` varchar(20) NOT NULL, \`password\` varchar(20) NOT NULL, \`first_name\` varchar(20) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`email\` varchar(50) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_074a1f262efaca6aba16f7ed92\` (\`user_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_price\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_id\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`currency\` varchar(3) NOT NULL DEFAULT 'ARS', UNIQUE INDEX \`REL_0da08b762f53700e4f8760a9b5\` (\`product_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_categories\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_a75bfadcd8291a0538ab7abfdc\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`product_category_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`budget_id\` int NOT NULL, \`product_id\` int NOT NULL, \`quantity\` int NOT NULL, \`unit_price\` decimal NOT NULL, \`discount\` decimal NOT NULL, \`tax\` decimal NOT NULL, \`total_line\` decimal NOT NULL, \`budgetId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_status_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`budget_id\` int NOT NULL, \`status_id\` int NOT NULL, \`user_id\` int NOT NULL, \`changed_at\` timestamp(0) NOT NULL, \`is_reverted\` tinyint NOT NULL, \`budgetId\` int NULL, \`statusId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer_shipping\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`customer_id\` int NOT NULL, \`recipient_first_name\` varchar(255) NOT NULL, \`recipient_last_name\` varchar(255) NOT NULL, \`recipient_company_name\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`phone_area_code\` varchar(255) NOT NULL, \`alias\` varchar(255) NOT NULL, \`adress\` varchar(255) NOT NULL, \`number\` int NOT NULL, \`complement\` int NOT NULL, \`postal_code\` int NOT NULL, \`delivery_instructions\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(20) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`company_name\` varchar(20) NOT NULL, \`gender\` varchar(10) NULL, \`address\` varchar(30) NOT NULL, \`zip_code\` decimal NOT NULL, \`type_of_document\` varchar(255) NOT NULL, \`document\` decimal NOT NULL, \`internal_code\` decimal NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`sale_number\` varchar(255) NOT NULL, \`subtotal\` decimal NOT NULL, \`total_discount\` decimal NOT NULL, \`total_tax\` decimal NOT NULL, \`total\` decimal NOT NULL, \`customer_id\` int NOT NULL, \`seller_id\` int NOT NULL, \`currency_id\` int NOT NULL, \`status_id\` int NOT NULL, UNIQUE INDEX \`IDX_a8b96820b2d7cc66ad39df9760\` (\`code\`), UNIQUE INDEX \`IDX_cdc6c7a31147f4b2b32a310411\` (\`sale_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`currencies\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`quotation\` decimal(10,8) NULL, \`conversion\` decimal(10,8) NULL DEFAULT '1.00000000', \`code\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_price_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_id\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`currency\` varchar(3) NOT NULL DEFAULT 'ARS', \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer_status\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`color\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer_category\` (\`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`active\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_shipping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(20) NOT NULL, \`city_id\` varchar(255) NOT NULL, \`state_id\` varchar(20) NOT NULL, \`country_id\` decimal NOT NULL, \`email\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_billing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`budget_id\` int NOT NULL, \`buyer_company\` varchar(20) NOT NULL, \`buyer_address\` varchar(20) NOT NULL, \`consignee_address\` varchar(255) NOT NULL, \`buyer_tax_id\` decimal NOT NULL, \`shipping_country\` varchar(30) NOT NULL, \`port_destination\` varchar(255) NOT NULL, \`payment_description\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_price\` ADD CONSTRAINT \`FK_0da08b762f53700e4f8760a9b5c\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_c385a97195418da0bd3a08ceced\` FOREIGN KEY (\`product_category_id\`) REFERENCES \`product_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget_item\` ADD CONSTRAINT \`FK_500905b400fb6c006bd6f1b5d1f\` FOREIGN KEY (\`budgetId\`) REFERENCES \`budget\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget_item\` ADD CONSTRAINT \`FK_2d25b997c52abfcb07f90798ce8\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget_status_history\` ADD CONSTRAINT \`FK_571cea2d0c7eac6bdee2ec217c8\` FOREIGN KEY (\`budgetId\`) REFERENCES \`budget\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget_status_history\` ADD CONSTRAINT \`FK_484543591116f16555edacbd5d7\` FOREIGN KEY (\`statusId\`) REFERENCES \`budget_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer_shipping\` ADD CONSTRAINT \`FK_e3ba501b99feb5eb6f2a06cb783\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget\` ADD CONSTRAINT \`FK_24a464656b77ca9d3fa978fb76c\` FOREIGN KEY (\`status_id\`) REFERENCES \`budget_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget\` ADD CONSTRAINT \`FK_f899efb8586355bfaf52f0f15a8\` FOREIGN KEY (\`seller_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget\` ADD CONSTRAINT \`FK_a5c637d1cd6bc3fe9c474df5cce\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget\` ADD CONSTRAINT \`FK_588bf1a6e6d466173667d0268a1\` FOREIGN KEY (\`currency_id\`) REFERENCES \`currencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_price_history\` ADD CONSTRAINT \`FK_9bbe39ab10e86530296c3340aa3\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_price_history\` DROP FOREIGN KEY \`FK_9bbe39ab10e86530296c3340aa3\``);
        await queryRunner.query(`ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_588bf1a6e6d466173667d0268a1\``);
        await queryRunner.query(`ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_a5c637d1cd6bc3fe9c474df5cce\``);
        await queryRunner.query(`ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_f899efb8586355bfaf52f0f15a8\``);
        await queryRunner.query(`ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_24a464656b77ca9d3fa978fb76c\``);
        await queryRunner.query(`ALTER TABLE \`customer_shipping\` DROP FOREIGN KEY \`FK_e3ba501b99feb5eb6f2a06cb783\``);
        await queryRunner.query(`ALTER TABLE \`budget_status_history\` DROP FOREIGN KEY \`FK_484543591116f16555edacbd5d7\``);
        await queryRunner.query(`ALTER TABLE \`budget_status_history\` DROP FOREIGN KEY \`FK_571cea2d0c7eac6bdee2ec217c8\``);
        await queryRunner.query(`ALTER TABLE \`budget_item\` DROP FOREIGN KEY \`FK_2d25b997c52abfcb07f90798ce8\``);
        await queryRunner.query(`ALTER TABLE \`budget_item\` DROP FOREIGN KEY \`FK_500905b400fb6c006bd6f1b5d1f\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_c385a97195418da0bd3a08ceced\``);
        await queryRunner.query(`ALTER TABLE \`product_price\` DROP FOREIGN KEY \`FK_0da08b762f53700e4f8760a9b5c\``);
        await queryRunner.query(`DROP TABLE \`budget_billing\``);
        await queryRunner.query(`DROP TABLE \`budget_shipping\``);
        await queryRunner.query(`DROP TABLE \`customer_category\``);
        await queryRunner.query(`DROP TABLE \`customer_status\``);
        await queryRunner.query(`DROP TABLE \`product_price_history\``);
        await queryRunner.query(`DROP TABLE \`currencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_cdc6c7a31147f4b2b32a310411\` ON \`budget\``);
        await queryRunner.query(`DROP INDEX \`IDX_a8b96820b2d7cc66ad39df9760\` ON \`budget\``);
        await queryRunner.query(`DROP TABLE \`budget\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer_shipping\``);
        await queryRunner.query(`DROP TABLE \`budget_status_history\``);
        await queryRunner.query(`DROP TABLE \`budget_status\``);
        await queryRunner.query(`DROP TABLE \`budget_item\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_a75bfadcd8291a0538ab7abfdc\` ON \`product_categories\``);
        await queryRunner.query(`DROP TABLE \`product_categories\``);
        await queryRunner.query(`DROP INDEX \`REL_0da08b762f53700e4f8760a9b5\` ON \`product_price\``);
        await queryRunner.query(`DROP TABLE \`product_price\``);
        await queryRunner.query(`DROP INDEX \`IDX_074a1f262efaca6aba16f7ed92\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
