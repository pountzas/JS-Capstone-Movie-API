/* eslint-disable no-unused-vars */
import { getLikes, addLike } from './likesAPI.js';
import { getComments, submitComment } from './commentsAPI.js';
import { countCards, countLikes, countComments } from './counts.js';

class UI {
  constructor() {
    this.movie = document.querySelector('#movie-box');
    this.commentAuthors = [];
    this.searchInput = document.querySelector('#search-input');
    this.titleInput = document.querySelector('title-input');
    this.bodyInput = document.querySelector('.body-input');
    this.commentSubmit = document.querySelector('#comment-submit-btn');
  }

  // Show movies
  async showMovies(movies) {
    const likeArray = await getLikes();
    let output = '';
    let likeCount = 0;

    movies.forEach((movie) => {
      likeArray.forEach((like) => {
        // eslint-disable-next-line eqeqeq
        if (like.item_id == movie.show.id) {
          likeCount = like.likes;
        }
      });

      const image = movie.show.image?.medium ?? 'https://i.ibb.co/nPzyFm6/placeholder.png';
      output += `
      <div class="card card-movie mb-5 border border-5 shadows" id="${movie.show.id}" style="max-width: 20rem, max-height: 20rem;">
        <img src="${image}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${movie.show.name}</h5>
          <p class="card-text">Premiered: ${movie.show.premiered}</p>
            <i type="button" class="far fa-thumbs-up like-btn">${likeCount}</i>
          
          <p class="card-text"></p>
          <div class="d-flex justify-content-between">
            
            <button type="button" class="btn btn-primary comments-btn">
              Comments
            </button>

            <div class="ml-3 btn btn-primary reservations-btn">Reservations</div>
          </div>
        </div>
      </div>
      `;
    });

    this.movie.innerHTML = output;

    const movieKids = this.movie.children;

    const openPop = document.getElementById('overlay');
    const closePop = document.getElementsByClassName('close-pop');
    const movieName = document.getElementsByClassName('movie-name');
    const movieImage = document.getElementsByClassName('movie-image');
    const movieYear = document.getElementsByClassName('movie-year');
    const movieDesc = document.getElementsByClassName('description');
    const commentAuthor = document.querySelector('#author-input');
    const commentBody = document.querySelector('#comment-input');

    function openCommentsModal(sourceId) {
      console.log('works');
      closePop.addEventListener('click', () => {
        if (!openPop.classList.contains('hidden')) {
          console.log('ok');
          openPop.addClass(' hidden');
        }
      });
      const imageM = document.querySelector(`#${sourceId}`)[0].getAttribute('src');
      movieImage.src = imageM;
      console.log(imageM);
      console.log(movieImage.src);

      const nameM = document.querySelector(`#${sourceId}`)[1];
      movieName.innerHTML = nameM[0].innerHTML;

      const premierM = document.querySelector(`#${sourceId}`)[1];
      movieYear.innerHTML = premierM[1].innerHTML;
    }

    Array.from(movieKids).forEach((item) => {
      item.querySelector('.like-btn').addEventListener('click', (e) => {
        addLike(e.target.parentNode.parentNode.id);
        let addCount = parseInt(e.target.innerHTML, 10);
        console.log(e.target.parentNode.parentNode.id);
        addCount += 1;
        console.log(typeof addCount);
        e.target.innerHTML = addCount;
      });

      item.querySelector('.comments-btn').addEventListener('click', (e) => {
        console.log('works');
        console.log(e.target.parentNode.parentNode.parentNode.id);
        if (openPop.classList.contains('hidden')) {
          openPop.classList.remove('hidden');
          console.log('works fine');
        }
        openCommentsModal(e.target.parentNode.parentNode.parentNode.id);
      });

      item.querySelector('.reservations-btn').addEventListener('click', () => {
        console.log('works');
        console.log(item.id);
      });
    });
  }

  // Show all comments
  showComments(comments) {
    let output = '';

    comments.forEach((comment) => {
      output += `
      <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${comment.title} by: ${comment.author}</h4>
            <p class="card-text">${comment.body}</p>
            <a href="#" class="delete card-link" data-id="${comment.id}">
            </a>
          </div>
        </div>
      <div class="comment">
        <div class="comment-author">${comment.author}</div>
        <div class="comment-body">${comment.body}</div>
      </div>`;
    });

    this.comment.innerHTML = output;
  }

  // Clear search input
  clearSearch() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

const ui = new UI();
export { ui, countCards };
