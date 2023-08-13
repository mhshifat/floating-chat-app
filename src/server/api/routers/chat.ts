import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const chatRouter = createTRPCRouter({
  conversations: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.conversationUser.findMany({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        conversation: {
          include: {
            conversationUsers: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                  }
                }
              }
            },
            lastMessage: true
          },
        }
      },
      orderBy: {
        conversation: {
          lastMessageId: 'desc'
        }
      }
    })
  }),
  findConversation: protectedProcedure.input(z.object({
    userId: z.string()
  })).query(async ({ ctx, input }) => {
    const conversationUsers = await ctx.prisma.conversationUser.groupBy({
      by: ['conversationId'],
      where: {
        userId: {
          in: [input.userId, ctx.session.user.id]
        }
      },
      having: {
        userId: {
          _count: {
            equals: 2
          }
        }
      }
    });

    return conversationUsers.length ? conversationUsers[0]?.conversationId : null;
  }),
  messages: protectedProcedure.input(z.object({
    conversationId: z.string()
  })).query(async ({ ctx, input }) => {
    await ctx.prisma.conversationUser.findUniqueOrThrow({
      where: {
        userId_conversationId: {
          userId: ctx.session.user.id,
          conversationId: input.conversationId
        }
      }
    });
    return ctx.prisma.message.findMany({
      where: {
        conversationId: input.conversationId
      },
      orderBy: {
        id: 'asc'
      },
    })
  }),
  sendMessage: protectedProcedure.input(z.object({
    conversationId: z.string().nullish(),
    messageText: z.string(),
    userId: z.string().nullish(),
  })).mutation(async ({ ctx, input: { conversationId, messageText, userId } }) => {
    if (!conversationId) {
      if (!userId) {
        throw new Error('No recipient passes');
      }

      return ctx.prisma.$transaction(async (transaction) => {
        const conversation = await transaction.conversation.create({
          data: {
            messages: {
              create: {
                messageText,
                userId: ctx.session.user.id,
              }
            },
            conversationUsers: {
              createMany: {
                data: [{ userId }, { userId: ctx.session.user.id }]
              }
            }
          },
          include: {
            messages: true
          }
        })
        await transaction.conversation.update({
          data: {
            lastMessageId: conversation.messages[0]!.id
          },
          where: {
            id: conversation.id
          }
        })

        return conversation;
      })
    }
    await ctx.prisma.$transaction(async (transaction) => {
      const [message] = await Promise.all([
        transaction.message.create(({
          data: {
            messageText,
            userId: ctx.session.user.id,
            conversationId
          }
        })),
        transaction.conversationUser.findUniqueOrThrow({
          where: {
            userId_conversationId: {
              userId: ctx.session.user.id,
              conversationId
            }
          }
        })
      ])

      await transaction.conversation.update({
        data: {
          lastMessageId: message.id
        },
        where: {
          id: conversationId
        }
      })
    })
  })
});
