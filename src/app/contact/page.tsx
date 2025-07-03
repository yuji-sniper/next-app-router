import { getContacts } from "@/lib/contact"
import Link from "next/link"

export default async function Page() {

  const contacts = await getContacts()

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>{contact.name}｜{contact.email}｜{contact.message}</li>
        ))}
      </ul>
      <Link href="/contact/input">Input</Link>
    </div>
  )
}
