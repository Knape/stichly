import { builder } from "../builder";

builder.prismaObject("Store", {
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("url"),
  }),
});

builder.queryField("stores", (t) =>
  t.prismaField({
    type: ["Store"],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.store.findMany({ ...query }),
  })
);
