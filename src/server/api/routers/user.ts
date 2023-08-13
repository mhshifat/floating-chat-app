import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
  changeUserData: protectedProcedure.input(z.object({
    name: z.string().nullish(),
    username: z.string().nullish(),
    image: z.string().nullish(),
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id
      },
      data: input,
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      }
    })
  }),
  changeTheme: protectedProcedure.input(z.object({ theme: z.enum(['light', 'dark']) })).mutation(({ ctx, input: { theme } }) => {
    return ctx.prisma.user.update({
      data: {
        theme
      },
      where: {
        id: ctx.session.user.id
      },
      select: {
        id: true,
        theme: true,
      }
    })
  }),
  users: protectedProcedure.input(z.object({
    user: z.string()
  })).query(({ ctx, input }) => {
    return ctx.prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: input.user,
              mode: 'insensitive'
            }
          },
          {
            username: {
              contains: input.user,
              mode: 'insensitive'
            }
          },
        ],
        NOT: {
          id: ctx.session.user.id
        }
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      }
    })
  })
})
