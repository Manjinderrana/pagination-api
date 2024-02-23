-- DropIndex
DROP INDEX "product_store_view_code_key";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "sku" DROP NOT NULL,
ALTER COLUMN "store_view_code" DROP NOT NULL,
ALTER COLUMN "product_type" DROP NOT NULL,
ALTER COLUMN "categories" DROP NOT NULL,
ALTER COLUMN "product_websites" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");
