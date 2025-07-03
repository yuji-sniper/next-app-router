'use server'

import { redirect } from "next/navigation"
import { ContactSchema } from "@/validations/contact"
import { prisma } from "@/lib/prisma"

export type ContactActionState = {
  success: boolean
  input: {
    name: string
    email: string
    message: string
  }
  errors: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
  message?: string
}

export async function postContactForm(
  _: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  // バリデーション
  const validatedFields = ContactSchema.safeParse({
    name,
    email,
    message,
  })

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors
    return {
      success: false,
      input: {
        name: name as string,
        email: email as string,
        message: message as string,
      },
      errors: {
        name: errors.name ?? [],
        email: errors.email ?? [],
        message: errors.message ?? [],
      },
      message: '入力内容に誤りがあります'
    }
  }

  // DBに保存
  const existingContact = await prisma.contact.findUnique({
    where: {
      email: email as string,
    },
  })

  if (existingContact) {
    return {
      success: false,
      input: {
        name: name as string,
        email: email as string,
        message: message as string,
      },
      errors: {
        email: ['このメールアドレスはすでに使用されています'],
      },
      message: 'このメールアドレスはすでに使用されています',
    }
  }

  await prisma.contact.create({
    data: {
      name: name as string,
      email: email as string,
      message: message as string,
    },
  })

  redirect('/contact/complete')
}
