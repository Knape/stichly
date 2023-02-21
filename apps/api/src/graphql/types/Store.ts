import prisma from "../../lib/prisma";
import { builder } from "../builder";

builder.prismaObject("Store", {
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("url"),
    name: t.exposeString("name"),
    brandsPath: t.exposeString("brandsPath"),
    brands: t.relation("brands"),
  }),
});

builder.queryField("stores", (t) =>
  t.prismaField({
    type: ["Store"],
    resolve: async (query, _parent, _args, _ctx, _info) =>
      prisma.store.findMany({ ...query }),
  })
);

builder.queryField("store", (t) =>
  t.prismaField({
    type: "Store",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, ctx, _info) =>
      prisma.store.findUniqueOrThrow({
        ...query,
        where: { id: Number.parseInt(String(args.id), 10) },
      }),
  })
);
