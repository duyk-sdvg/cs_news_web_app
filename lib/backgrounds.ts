export const BACKGROUNDS = {
  furia: "/backgrounds/furia.png",
  natus_vincere: "/backgrounds/natus_vincere.png",
  spirit: "/backgrounds/spirit.png",
};

export const DEFAULT_BACKGROUND = "/backgrounds/default.png";

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_+|_+$)/g, "");
}

export function getBackground(teamName: string) {
  if (!teamName) return DEFAULT_BACKGROUND;
  const key = slugify(teamName);
  return BACKGROUNDS[key] ?? DEFAULT_BACKGROUND;
}
