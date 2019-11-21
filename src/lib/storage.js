/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const imgs = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
  return imgs;
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let listi;
  if (window.localStorage.getItem(LOCALSTORAGE_KEY)) {
    listi = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
    listi.push({
      type, mediaUrl, text, title,
    });
  } else {
    listi = Array({
      type, mediaUrl, text, title,
    });
  }
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(listi));
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
