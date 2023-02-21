export const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const isRelativeUrl = (url: string): boolean => {
  return url[0] === "/";
};

export const relativeToAbosluteUrl = (domain: string, path: string): string => {
  return domain + path;
};

export const formatUrl = (url: string, domain: string): string => {
  return isRelativeUrl(url) ? relativeToAbosluteUrl(domain, url) : url;
};
