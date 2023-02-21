import { builder } from "./builder";
import { prisma } from "./db";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email"),
  }),
});

export const UserUniqueInput = builder.inputType("UserUniqueInput", {
  fields: (t) => ({
    id: t.int(),
    email: t.string(),
  }),
});

builder.queryFields((t) => ({
  allUsers: t.prismaField({
    type: ["User"],
    resolve: (query) => prisma.user.findMany({ ...query }),
  }),
}));
