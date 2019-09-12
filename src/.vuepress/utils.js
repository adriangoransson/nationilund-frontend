import { format, parseISO, isValid } from 'date-fns';

export const validDate = date => isValid(parseISO(date));

export const apiDateFormat = date => format(date, 'yyyy-MM-dd');

export const formatHours = date => format(date, 'HH:mm');

export const formatDate = date => format(date, 'MMM d',);

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/(ä|å)/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
