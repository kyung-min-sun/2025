import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";
import { z } from "zod";

export const resolutionRouter = createTRPCRouter({
  getResolutions: publicProcedure
    .input(z.object({ date: z.optional(z.date()) }))
    .query(async ({ ctx: { db }, input: { date } }) => {
      return await db.resolution.findMany({
        where: {
          ...(date && {
            createdAt: {
              gte: date,
              lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            },
          }),
        },
      });
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
