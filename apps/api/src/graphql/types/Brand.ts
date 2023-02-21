import { builder } from "../builder";

builder.prismaObject("Brand", {
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("url"),
    path: t.exposeString("path"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    products: t.prismaConnection({
      type: "Product",
      cursor: "id",
      resolve: (query, parent, args, context, info) =>
        prisma.product.findMany({ ...query }),
    }),
  }),
});

builder.prismaObject("Store", {
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("url"),
  }),
});

builder.prismaNode("Product", {
  id: { field: "id" },
  fields: (t) => ({
    url: t.exposeString("url"),
  }),
});

builder.queryField("brands", (t) =>
  t.prismaConnection({
    type: "Brand",
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.brand.findMany({ ...query }),
  })
);
