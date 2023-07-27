export function createMarkup(imgData) {
    return imgData.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    `<a class="gallery__link" href=${largeImageURL}>
  <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</a>`
}).join('')
}