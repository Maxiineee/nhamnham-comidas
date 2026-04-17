/*
  Warnings:

  - The values [tableSpoon,teaSpoon,dessertSpoon,coffeeSpoon] on the enum `EnumUnit` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumUnit_new" AS ENUM ('g', 'kg', 'ml', 'l', 'cup', 'tablespoon', 'teaspoon', 'dessertspoon', 'coffeespoon', 'unit', 'pinch', 'toTaste', 'drizzle');
ALTER TABLE "RecipeIngredient" ALTER COLUMN "unit" TYPE "EnumUnit_new" USING ("unit"::text::"EnumUnit_new");
ALTER TABLE "ShoppingListIngredient" ALTER COLUMN "unit" TYPE "EnumUnit_new" USING ("unit"::text::"EnumUnit_new");
ALTER TYPE "EnumUnit" RENAME TO "EnumUnit_old";
ALTER TYPE "EnumUnit_new" RENAME TO "EnumUnit";
DROP TYPE "public"."EnumUnit_old";
COMMIT;
