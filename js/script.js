const imgContainer = document.querySelector('#image-container')
const loader = document.querySelector('.loader')
// Unsplash Api
let count = 5
const apiKey = 'rFimFLOONZ5lybpA4GjiFrG0Gqac8nQhN248OQAbTi4'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let ready = false;
let imagesLoaded = 0
let totalImages = 0
let photosArr = []

// Helper function to set attributes to DOM Elements
function setAttributesFunc(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function isImageLoaded() {
  imagesLoaded++
  if(imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true;
    count = 30
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
  }
}

function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArr.length
  // Run function for each object in photoArr
  photosArr.forEach((photo, key) => {
    // Create <a> to link to Unsplash
    const a = document.createElement('a')
    setAttributesFunc(a, {href: photo.links.html})
    
    // Create <img> for photos
    const img = document.createElement('img')
    setAttributesFunc(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    
    // Check if our images were loaded
    
    img.addEventListener('load', isImageLoaded())
    // Put <img> inside <a>, then put both to the imgContainer Element
    a.appendChild(img)
    imgContainer.appendChild(a)
  })
}
async function getPhotosFromUnsplash() {
  try {
    const response = await fetch(apiUrl)
    photosArr = await response.json()

    displayPhotos()
  } catch (error) {
    console.log('oops', error);
  }
}

window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotosFromUnsplash()
  }
})

// On load
getPhotosFromUnsplash()