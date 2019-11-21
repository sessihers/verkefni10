import generateRandomDate from './helpers';

/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'nlguZK1JE07NidKuVnvZSoTeDQP9iKDgVKlMYqZT';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=`;

/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const date = generateRandomDate();
  return fetch(`${URL}${date}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Villa við að sækja gögn');
    });
}
