import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAllHighlights(magazineKey) {
  return new Promise(async (resolve) => {
    resolve(JSON.parse(await AsyncStorage.getItem(`highlight-${magazineKey}`)));
  });
}

export async function setAllHighlights(magazineKey, highlights) {
  return AsyncStorage.setItem(
    `highlight-${magazineKey}`,
    JSON.stringify(highlights),
  );
}

export async function removeHightlight(magazineKey) {
  const allHightlight = (await getAllHighlights(magazineKey)) || [];
  allHightlight.pop();

  await setAllHighlights(magazineKey, allHightlight);

  return getAllHighlights(magazineKey);
}

export async function addHighlight(magazineKey, highlight) {
  const allHightlight = (await getAllHighlights(magazineKey)) || [];

  allHightlight.push(highlight);

  await setAllHighlights(magazineKey, allHightlight);

  return getAllHighlights(magazineKey);
}

const ALREADY_CHECKED_FIRST_TIME = 'ALREADY_CHECKED_FIRST_TIME';

export async function firstTimeHighlight() {
  const firstTimeString = await AsyncStorage.getItem('first-time-hightlight');

  return firstTimeString !== ALREADY_CHECKED_FIRST_TIME;
}

export async function setFirstTimeHighlight() {
  return AsyncStorage.setItem(
    'first-time-hightlight',
    ALREADY_CHECKED_FIRST_TIME,
  );
}
