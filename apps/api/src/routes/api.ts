import * as express from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "database";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.send("API home");
});

router.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json({
    success: true,
    data: users,
  });
});

router.get("/stores", async (req: Request, res: Response) => {
  const stores = await prisma.store.findMany();
  return res.json({
    success: true,
    data: stores,
  });
});

router.get("/brands", async (req: Request, res: Response) => {
  const brands = await prisma.brand.findMany({ include: { store: true } });
  return res.json({
    success: true,
    data: brands,
  });
});

router.get("/brands/:id/products", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { brandId: Number(id) },
      include: {
        store: true,
        priceHistory: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    return res.json({
      success: true,
      data: products || [],
    });
  } catch (error) {
    return res.json({
      success: true,
      data: [],
    });
  }
});

router.get("/products", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      priceHistory: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      brand: true,
      store: true,
    },
  });
  return res.json({
    success: true,
    data: products,
  });
});

router.get("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      priceHistory: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      brand: true,
      store: true,
    },
  });
  return res.json({
    success: true,
    data: products,
  });
});

export const api = router;
