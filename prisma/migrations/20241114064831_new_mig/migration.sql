-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "attribute_set_code" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "product_websites" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_sku_key" ON "product"("sku");
