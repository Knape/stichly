import * as express from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "database";

import { updateProductPrices, updateBrandProducts } from "../worker";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/generate-product-price", async (req: Request, res: Response) => {
  const allproducts = await prisma.product.findMany();
  await updateProductPrices(allproducts);
  res.send("done");
});

router.get("/generate-product", async (req: Request, res: Response) => {
  const brand = await prisma.brand.findUnique({ where: { id: 2 } });
  if (!brand) return res.send("no brand");
  await updateBrandProducts(brand);
  res.send("done");
});

export const generate = router;
