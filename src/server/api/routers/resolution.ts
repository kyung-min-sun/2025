import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const resolutionRouter = createTRPCRouter({
  getResolutions: publicProcedure.query(async ({ ctx: { db } }) => {
    return await db.resolution.findMany();
  }),
  createResolution: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      return await db.resolution.create({
        data: input,
      });
    }),
  deleteResolution: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      return await db.resolution.delete({
        where: { id: input.id },
      });
    }),
});
