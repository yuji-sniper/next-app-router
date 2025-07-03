'use server'

import { redirect } from "next/navigation"
import { ContactSchema } from "@/validations/contact"

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
  serverError?: string
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
      serverError: '入力内容に誤りがあります'
    }
  }

  // DBに保存

  redirect('/contact/complete')
}
