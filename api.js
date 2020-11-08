export const SGI_ENTRYPOINT = 'https://sgi-italia.org/wp-json/app-sgi/v1';
export const VOLO_ENTRYPOINT = 'https://ilvolocontinuo.it/wp-json/app-sgi/v1';
export const SGI_SERVICES = 'https://servizi.sgi-italia.org';

export const getJsonData = (url, parameters, entrypoint = SGI_ENTRYPOINT) => {
  let completeUrl = [entrypoint, url].join('/');

  if (parameters) {
    const queryParam = new URLSearchParams(parameters);
    completeUrl += `?${queryParam.toString()}`;
  }
  return fetch(completeUrl).then((r) => r.json());
};

export const loginRequest = (user, md5password) => {
  return getJsonData(
    'abbonamenti/l/signApp.php',
    {user, password: md5password},
    SGI_SERVICES,
  );
};
