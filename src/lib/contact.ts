import { prisma } from "@/lib/prisma"

export async function getContacts() {
  return await prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getContact(id: string) {
  return await prisma.contact.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
    },
    where: {
      id,
    },
  })
}
