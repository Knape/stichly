import { PrismaClient } from "database";
import prisma from "../lib/prisma";

export interface Context {
  prisma: PrismaClient;
}

const createContext = (): Context => {
  return { prisma };
};

export default createContext;
