import { builder } from "../builder";

builder.prismaObject("Product", {
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("url"),
    active: t.exposeBoolean("active"),
    createdAt: t.expose("createdAt", { type: "Date" }),
    name: t.expose("name", { nullable: true, type: "String" }),
    image: t.expose("image", { nullable: true, type: "String" }),
    description: t.expose("description", { nullable: true, type: "String" }),
    details: t.expose("details", { nullable: true, type: "String" }),
    category: t.expose("category", { nullable: true, type: "String" }),
    salePrice: t.expose("salePrice", { nullable: true, type: "Int" }),
    price: t.exposeInt("price"),
    discount: t.exposeInt("discount"),
    priceHistory: t.relation("priceHistory", {
      args: {
        oldestFirst: t.arg.boolean(),
        count: t.arg.int(),
      },
      query: (args, context) => ({
        take: args.count ?? undefined,
        orderBy: {
          createdAt: args.oldestFirst ? "asc" : "desc",
        },
      }),
    }),
  }),
});

builder.prismaObject("PriceHistory", {
  fields: (t) => ({
    id: t.exposeID("id"),
    salePrice: t.expose("salePrice", {
      nullable: true,
      type: "Int",
    }),
    price: t.exposeInt("price"),
    discount: t.exposeInt("discount"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    isoDate: t.exposeString("isoDate"),
  }),
});

builder.queryField("products", (t) =>
  t.prismaConnection({
    type: "Product",
    cursor: "id",
    resolve: async (query, _parent, _args, _ctx, _info) =>
      prisma.product.findMany({ ...query }),
  })
);

builder.queryField("product", (t) =>
  t.prismaField({
    type: "Product",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, _parent, args, ctx, _info) =>
      prisma.product.findUniqueOrThrow({
        ...query,
        where: { id: Number.parseInt(String(args.id), 10) },
      }),
  })
);
