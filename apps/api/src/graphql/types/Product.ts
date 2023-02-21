import { builder } from "../builder";

builder.prismaObject("Product", {
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("url"),
    PriceHistory: t.prismaConnection({
      type: "PriceHistory",
      cursor: "id",
      resolve: (query, parent, args, context, info) =>
        prisma.priceHistory.findMany({ ...query }),
    }),
  }),
});

builder.queryField("products", (t) =>
  t.prismaField({
    type: ["Product"],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.product.findMany({ ...query }),
  })
);
