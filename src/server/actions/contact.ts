'use server';

import { prisma } from '@/lib/db';
import { contactMessageSchema, contentSuggestionSchema, ContactMessageInput, ContentSuggestionInput } from '@/schemas/contact';

export async function sendContactMessageAction(data: ContactMessageInput) {
  const validated = contactMessageSchema.parse(data);

  const contact = await prisma.contactMessage.create({
    data: {
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
    },
  });

  return { success: true, id: contact.id };
}

export async function sendContentSuggestionAction(data: ContentSuggestionInput) {
  const validated = contentSuggestionSchema.parse(data);

  const suggestion = await prisma.contentSuggestion.create({
    data: {
      kind: validated.kind,
      body: validated.body,
      url: validated.url || null,
      submitter_email: validated.submitter_email || null,
    },
  });

  return { success: true, id: suggestion.id };
}
