const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplah API
const count = 10;
const apiKey = 'oZEOVn0W8Hfh1tpXTl-LJaQ_xA8COix8uwGDfizONQg'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos(photosArray) {
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos(url) {
  try {
    const response = await fetch(url);
    let photosArray = await response.json();
    return displayPhotos(photosArray);
  } catch (error) {
    console.log('Fetch não iniciado!')
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos(apiURL);
    console.log('load more');
  }
});

// On Load
getPhotos(apiURL);