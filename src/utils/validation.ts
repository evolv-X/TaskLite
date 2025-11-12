import { MAX_TITLE_LENGTH } from "../consts/const.js";

export function isValidTaskTitle(title: string):boolean {
    const norm = normalizeTitle(title);
    return norm.length > 0 && norm.length <= MAX_TITLE_LENGTH;
}

export function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ");
}