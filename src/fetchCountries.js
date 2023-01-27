import ApiService from './apiService';

refs = {
  watched: document.querySelector('.watched'),
  queue: document.querySelector('.queue'),
  library: document.querySelector('.js-my-library-btn'),
  delete: document.querySelector('.delete'),
  //   addToWatched: document.querySelector(),
  //   addtoQueue: document.querySelector(),
};

refs.watched.addEventListener('click', onClick);
// refs.addToWatched.addEventListener('click', onAddToWatchedBtnClick);

const apiService = new ApiService();
const STORAGE_KEY = 'currentFilms';

// let watchedArr = [];
const watchedArr = JSON.parse(localStorage.getItem('watchedFilms'));
let queueArr = [];

function onClick(evt) {
  // Открыли сайт, пришел ответ с бека
  apiService.fetchTrendFilms();

  //    Нарисовали карточки фильмов
  // createFilmsMarkup(savedData);

  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const films = savedData.data.results;
  console.log(films);
  //   const idArr = films.map(film => film.id);
  //   console.log(idArr);

  // Клик по фильму №..., открылась модалка, evtTarget - есть обьект фильма
  const filmEvtCurrentTarget = films[18];
  console.log(filmEvtCurrentTarget);
  console.log(filmEvtCurrentTarget.id);

  console.log('Before Add', watchedArr);
  // проверяем есть ли он в списке Watched и Queue
  const clickedFilmToCheckW = watchedArr.find(
    film => film.id === filmEvtCurrentTarget.id
  );
  if (clickedFilmToCheckW) {
    // на кнопке Watched должно быть написано Удалить
    console.log('Такой фильм уже eсть');
    return;
  } else {
    //  Если фильма нет, на кнопке Watched есть ивент лисенер с ф.onAddToWatchedBtnClick
    // Клик на кнопку "Add to watched"
    console.log('НЕЕЕТ ЕГО');
    // onAddToWatchedBtnClick(filmEvtCurrentTarget);
  }

  //   const clickedFilmToCheckQ = queueArr.findIndex(
  //     film => film.id === filmEvtCurrentTarget.id
  //   );
  //   if (clickedFilmToCheckQ) {
  //     console.log('Такой фильм уже eсть');
  //     return;
  //     // на кнопке Queue должно быть написано Удалить
  //   } else {
  //     //  Если фильма нет, на кнопке Queue есть ивент лисенер с ф.onAddToQueueBtnClick
  //     // Клик на кнопку "Add to queue"
  //     console.log('НЕЕЕТ ЕГО');
  //     onAddToQueueBtnClick();
  //   }
}

refs.queue.addEventListener('click', onAddToWatchedBtnClick);

function onAddToWatchedBtnClick(evt) {
  apiService.fetchTrendFilms();
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const films = savedData.data.results;
  const filmToAdd = films[18];
  // const filmToAdd = evt.currentTarget;

  watchedArr.push(filmToAdd);
  console.log('After Adding', watchedArr);
  localStorage.setItem('watchedFilms', JSON.stringify(watchedArr));
  // Подмена кнопки
}

function onAddToQueueBtnClick(film) {
  queueArr.push(film);
}

refs.delete.addEventListener('click', onDeleteBtnClick);

function onDeleteBtnClick(evt) {
  apiService.fetchTrendFilms();
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const films = savedData.data.results;
  const filmToDelete = films[18];
  // const filmToDelete = evt.currentTarget;

  const filmToDeleteId = watchedArr.findIndex(
    film => film.id === filmToDelete.id
  );
  watchedArr.splice(filmToDeleteId, 1);
  console.log('After Delete', watchedArr);
  localStorage.setItem('watchedFilms', JSON.stringify(watchedArr));
  // Перерисовка интерфейса
  // Подмена кнопки
}

// let watchedArr = [
//   {
//     adult: false,
//     backdrop_path: '/nAUpDd7iGfESDomaeAWKeNABw4I.jpg',
//     genre_ids: [28, 12, 878],
//     id: 545611,
//     media_type: 'movie',
//     original_language: 'en',
//     original_title: 'Everything Everywhere All at Once',
//     overview:
//       "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
//     popularity: 254.782,
//     poster_path: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
//     release_date: '2022-03-24',
//     title: 'Everything Everywhere All at Once',
//     video: false,
//     vote_average: 8.041,
//     vote_count: 2823,
//   },
//   {
//     adult: false,
//     backdrop_path: '/1vXD5HXqkhvsXFHE7KmCPZGPR1e.jpg',
//     genre_ids: [18, 35],
//     id: 674324,
//     media_type: 'movie',
//     original_language: 'en',
//     original_title: 'The Banshees of Inisherin',
//     overview:
//       'Two lifelong friends find themselves at an impasse when one abruptly ends their relationship, with alarming consequences for both of them.',
//     popularity: 216.41,
//     poster_path: '/4yFG6cSPaCaPhyJ1vtGOtMD1lgh.jpg',
//     release_date: '2022-10-21',
//     title: 'The Banshees of Inisherin',
//     video: false,
//     vote_average: 7.5,
//     vote_count: 601,
//   },
// ];
