export const SGI_ENTRYPOINT = 'https://sgi-italia.org/wp-json/app-sgi/v1';
export const VOLO_ENTRYPOINT = 'https://ilvolocontinuo.it/wp-json/app-sgi/v1';
export const SGI_SERVICES = 'https://servizi.sgi-italia.org';
export const BS_ENTRYPOINT = 'https://buddismoesocieta.org/wp-json/app-sgi/v1';
export const NR_ENTRYPOINT =
  'https://ilnuovorinascimento.org/wp-json/app-sgi/v1';

export function getJsonData(url, parameters, entrypoint = SGI_ENTRYPOINT) {
  let completeUrl = [entrypoint, url].join('/');

  if (parameters) {
    const queryParam = new URLSearchParams(parameters);
    completeUrl += `?${queryParam.toString()}`;
  }
  console.log(completeUrl);
  return fetch(completeUrl).then((r) => r.json());
}

export function loginRequest(user, md5password) {
  return getJsonData(
    'abbonamenti/l/signApp.php',
    {user, password: md5password},
    SGI_SERVICES,
  );
}

export async function lastMaganize(maganize = 'nr') {
  return await getJsonData(
    'number',
    {},
    maganize === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
  );
}

export async function lastNews() {
  return await getJsonData('news', {
    posts_per_page: 1,
  });
}
