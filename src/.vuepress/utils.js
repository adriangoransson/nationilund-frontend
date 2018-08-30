import format from 'date-fns/format';

export const dateRegex = RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);

export const apiDateFormat = date => format(date, 'YYYY-MM-DD');

export const formatHours = date => format(date, 'HH:mm');

export const formatDate = date => format(date, 'MMM D',);

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