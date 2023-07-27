import { fetchImg } from './fetch';
import { createMarkup } from './create-markup';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more')
const gallery = document.querySelector('.gallery');
const simpleLightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', handleSubmit)

loadMoreBtn.addEventListener('click', loadMore)

let page = 1;
let searchValue = '';

loadMoreBtn.setAttribute('hidden', true)

async function handleSubmit(evt) {
    try {
        evt.preventDefault();
        page = 1
        gallery.innerHTML = '';
        searchValue = form.elements.searchQuery.value;

        if (searchValue === '') {
            Notiflix.Report.failure('Warning', 'Sorry, there are no images matching your search query. Please try again.')
            return;
        } else {
            const { hits, totalHits } = await fetchImg(searchValue)
            if (totalHits === 0) {
                Notiflix.Report.warning("Nothing has defined", "Sorry, there are no images matching your search query. Please try again.")
                return;
            }
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images`)
            gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
            simpleLightbox.refresh();
            evt.target.reset()
            loadMoreBtn.removeAttribute('hidden')
        }  
    }
    catch (error) {
        Notiflix.Report.warning("Invalid input", "Please enter a valid search query.");
    }
}

function loadMore() {
    page += 1;
    fetchImg(searchValue, page).then((data) => {
            // console.log(data)
            gallery.insertAdjacentHTML('beforeend', createMarkup(data))
            simpleLightbox.refresh();
        }).catch(error => console.log(error))
    }