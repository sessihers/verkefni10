import getRandomImage from './nasa-api';
import { empty, el } from './helpers';
import { save, load } from './storage';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

let apodSection;

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  getRandomImage().then((data) => {
    image = data;
    img = apodSection.querySelector('.apod__image');
    if (image.media_type !== 'image') {
      apodSection.removeChild(apodSection.firstChild);
      const video = el('iframe');
      video.src = image.url;
      apodSection.insertBefore(video, apodSection.childNodes[0]);
    } else {
      img.src = image.url;
    }
    title = apodSection.querySelector('.apod__title');
    text = apodSection.querySelector('.apod__text');
    empty(title);
    empty(text);
    title.appendChild(document.createTextNode(image.title));
    text.appendChild(document.createTextNode(image.explanation));
  }).catch(() => {
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.media_type, image.url, image.explanation, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  apodSection = apod;
  const fetchButton = document.getElementById('new-image-button');
  fetchButton.addEventListener('click', getNewImage);
  const saveButton = document.getElementById('save-image-button');
  saveButton.addEventListener('click', saveCurrentImage);
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const savedImgs = load();
  const main = document.querySelector('main');
  for (let i = 0; i < savedImgs.length; i += 1) {
    if (savedImgs[i].type !== 'image') {
      const div = el('div', el('h2', savedImgs[i].title), el('iframe'));
      div.classList.add('apod');
      div.firstChild.classList.add('apod__title');
      div.firstChild.nextSibling.classList.add('apod__img');
      div.firstChild.nextSibling.src = savedImgs[i].mediaUrl;
      main.appendChild(div);
    } else {
      const div = el('div', el('h2', savedImgs[i].title), el('img'));
      div.classList.add('apod');
      div.firstChild.classList.add('apod__title');
      div.firstChild.nextSibling.classList.add('apod__img');
      div.firstChild.nextSibling.src = savedImgs[i].mediaUrl;
      main.appendChild(div);
    }
  }
}
