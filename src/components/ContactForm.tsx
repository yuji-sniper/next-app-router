'use client'

import { ContactActionState, postContactForm } from "@/lib/actions/contact"
import { ContactSchema } from "@/validations/contact"
import { useActionState, useState } from "react"
import { ZodError } from "zod"

export default function ContactForm() {

  const [validationErrors, setValidationErrors] = useState<{
    name?: string[]
    email?: string[]
    message?: string[]
  }>({})

  const [prevState, formAction] = useActionState<
    ContactActionState,
    FormData
  >(postContactForm, {
    success: false,
    input: {
      name: '',
      email: '',
      message: '',
    },
    errors: {},
    serverError: undefined,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    try {
      switch (name) {
        case 'name':
          ContactSchema.pick({ name: true }).parse({ name: value })
          break
        case 'email':
          ContactSchema.pick({ email: true }).parse({ email: value })
          break
        case 'message':
          ContactSchema.pick({ message: true }).parse({ message: value })
          break
      }

      setValidationErrors({ ...validationErrors, [name]: undefined })
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationErrors({ ...validationErrors, [name]: error.errors[0].message })
      }
    }
  }

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-4">
        <label htmlFor="name">名前</label>
        <input type="text" name="name" className="border border-gray-300 rounded-md p-2" defaultValue={prevState.input.name}
          onChange={handleChange}
        />
        {prevState.errors.name && (
          <p className="text-red-500">{prevState.errors.name[0]}</p>
        )}
        {validationErrors.name && (
          <p className="text-red-500">{validationErrors.name}</p>
        )}
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" className="border border-gray-300 rounded-md p-2" defaultValue={prevState.input.email}
          onChange={handleChange}
        />
        {prevState.errors.email && (
          <p className="text-red-500">{prevState.errors.email[0]}</p>
        )}
        {validationErrors.email && (
          <p className="text-red-500">{validationErrors.email}</p>
        )}
        <label htmlFor="message">メッセージ</label>
        <textarea name="message" className="border border-gray-300 rounded-md p-2" defaultValue={prevState.input.message}
          onChange={handleChange}
        />
        {prevState.errors.message && (
          <p className="text-red-500">{prevState.errors.message[0]}</p>
        )}
        {validationErrors.message && (
          <p className="text-red-500">{validationErrors.message}</p>
        )}
        <button type="submit">送信</button>
      </form>
    </div>
  )
}
