import { format, parseISO, isValid } from 'date-fns';

const dateRegex = RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);

export const validDate = date => dateRegex.test(date) && isValid(parseISO(date));

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
