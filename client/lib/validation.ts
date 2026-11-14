/** Small, dependency-free form validation helpers with friendly messages. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Please enter your email address.";
  if (!EMAIL_RE.test(v))
    return "That email doesn't look right. Try something like name@example.com.";
  return undefined;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length < 2)
    errors.name = "Your name needs at least 2 characters.";

  const email = validateEmail(input.email);
  if (email) errors.email = email;

  if (!message) errors.message = "Please write a short message.";
  else if (message.length < MESSAGE_MIN)
    errors.message = `Your message needs at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX)
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  return errors;
}
