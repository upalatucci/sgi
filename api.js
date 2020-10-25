const ENTRYPOINT = 'https://sgi-italia.org/wp-json/app-sgi/v1';

export const getJsonData = (url, parameters) => {
  let completeUrl = [ENTRYPOINT, url].join('/');

  if (parameters) {
    const queryParam = new URLSearchParams(parameters);
    completeUrl += `?${queryParam.toString()}`;
  }
  return fetch(completeUrl).then((r) => r.json());
};
