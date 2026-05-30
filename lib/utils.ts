import { format, parseISO, isValid } from 'date-fns'

export function formatDate(value: string | Date | null | undefined): string {
  if (value == null || value === '') return ''

  const date = value instanceof Date ? value : parseISO(String(value))
  if (!isValid(date)) return String(value)

  return format(date, 'MMMM d, yyyy')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '…' : text
}
