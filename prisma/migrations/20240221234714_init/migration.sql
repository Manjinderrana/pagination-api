-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "store_view_code" TEXT NOT NULL,
    "attribute_set_code" TEXT,
    "product_type" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "product_websites" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "product_store_view_code_key" ON "product"("store_view_code");
