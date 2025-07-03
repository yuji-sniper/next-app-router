import { z } from "zod"

export const ContactSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスを入力してください" }),
  message: z.string().min(1, { message: "メッセージを入力してください" }),
})

export type ContactSchema = z.infer<typeof ContactSchema>
