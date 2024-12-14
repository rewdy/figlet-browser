/**
 * Create a slug
 */
export const createSlug = (text: string) => {
  return text.replace(/\W+/g, " ").trim().replace(" ", "_");
};
