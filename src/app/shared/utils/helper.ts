import { Title } from '@angular/platform-browser';

export function extractKeys(object: any, exclude: any[]) {
  const keys = [];
  for (const key in object) {
    if (exclude.indexOf(key) == -1) {
      keys.push(key);
    }

  }
  return keys;
}
/**
 * get the label text. replace underscores with spaces and capitalise
 * @param key any string
 * @returns string
 */
export function getLabelFromKey(key: string) {
  let str1 = replace_underscore(key, ' ');
  return str1.toUpperCase()
}

export function replace_underscore(str: string, sub: string): string {
  return str.replace(/_/g, sub);
}

export function generateUniqueRandomString(length: number): string {
  const timestamp = Date.now().toString(36);
  const randomChars = generateRandomChars(length - timestamp.length);
  const uniqueRandomString = timestamp + randomChars;
  return uniqueRandomString;
}

export function generateRandomChars(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function goBack() {
  window.history.back();
}

export function isEmpty(value:string|any[]|null|undefined): boolean{
  if (typeof (value) === "string") {
    return value.trim().length < 1;
  }
  if (Array.isArray(value)) {
    return value.length < 1;
  }
  return !value;

}

