import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  findMany: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),

  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let created;
      try {
        created = await ctx.db.user.create({
          data: input,
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }

      return created;
    }),

  createRole: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let created;
      try {
        created = await ctx.db.role.create({
          data: input,
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create role",
        });
      }

      return created;
    }),

  findRoles: publicProcedure.query(async ({ ctx }) => {
    const roles = await ctx.db.role.findMany();
    return roles;
  }),

  update: publicProcedure
    .input(z.object({ cuid: z.string(), role_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let updated;
      try {
        updated = await ctx.db.user.update({
          where: { cuid: input.cuid },
          data: { role_id: input.role_id },
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user",
        })
      }

      return updated;
    }),
});
