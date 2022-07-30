const STRAPI_PUBLIC_PATH =
  process.env.STRAPI_PUBLIC_PATH || "http://localhost:1337";

export const getStrapiUrl = (path) => {
  const fullpath = path.match(/^((http|https|ftp):\/\/)/)
    ? path
    : `${STRAPI_PUBLIC_PATH}${path}`;
  return fullpath;
};
