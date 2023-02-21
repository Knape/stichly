import { builder } from "../builder";

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({ ...query }),
  })
);

builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, ctx, _info) =>
      prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: Number.parseInt(String(args.id), 10) },
      }),
  })
);
