import { internet } from 'faker';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { UserInfo } from '../types/user-data';

export const mockFilms: Films = [
  {
    id: 13,
    name: 'War of the Worlds',
    posterImage: 'https://12.react.pages.academy/static/film/poster/War_of_the_Worlds.jpg',
    previewImage: 'https://12.react.pages.academy/static/film/preview/war-of-the-worlds.jpg',
    backgroundImage: 'https://12.react.pages.academy/static/film/background/War_of_the_Worlds.jpg',
    backgroundColor: '#9B7E61',
    videoLink: 'https://12.react.pages.academy/static/film/video/bubbles.mp4',
    previewVideoLink: 'https://12.react.pages.academy/static/film/video/dog.mp4',
    description: 'As Earth is invaded by alien tripod fighting machines, one family fights for survival.',
    rating: 9.3,
    scoresCount: 386834,
    director: 'Steven Spielberg',
    starring: ['Tom Cruise', 'Dakota Fanning', 'Tim Robbins',],
    runTime: 116,
    genre: 'Adventure',
    released: 2005,
    isFavorite: false
  },

  {
    name: 'Legend',
    posterImage: 'https://12.react.pages.academy/static/film/poster/Legend.jpg',
    previewImage: 'https://12.react.pages.academy/static/film/preview/legend.jpg',
    backgroundImage: 'https://12.react.pages.academy/static/film/background/legend.jpg',
    backgroundColor: '#E1DAD7',
    description: 'Identical twin gangsters Ronald and Reginald Kray terrorize London during the 1960s.',
    rating: 3.5,
    scoresCount: 138487,
    director: 'Brian Helgeland',
    starring: [
      'Tom Hardy',
      'Emily Browning',
      'Taron Egerton'
    ],
    runTime: 132,
    genre: 'Crime',
    released: 2015,
    id: 2,
    isFavorite: false,
    videoLink: 'https://12.react.pages.academy/static/film/video/bubbles.mp4',
    previewVideoLink: 'https://12.react.pages.academy/static/film/video/dog.mp4'
  },

  {
    name: 'No Country for Old Men',
    posterImage: 'https://12.react.pages.academy/static/film/poster/No_Country_for_Old_Men.jpg',
    previewImage: 'https://12.react.pages.academy/static/film/preview/no-country-for-old-men.jpg',
    backgroundImage: 'https://12.react.pages.academy/static/film/background/No_Country_for_Old_Men.jpg',
    backgroundColor: '#BDAD8F',
    description: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.',
    rating: 4.1,
    scoresCount: 764976,
    director: 'Ethan Coen',
    starring: [
      'Tommy Lee Jones',
      'Javier Bardem',
      'Josh Brolin'
    ],
    runTime: 122,
    genre: 'Crime',
    released: 2007,
    id: 4,
    isFavorite: false,
    videoLink: 'https://12.react.pages.academy/static/film/video/bubbles.mp4',
    previewVideoLink: 'https://12.react.pages.academy/static/film/video/dog.mp4'
  },

  {
    name: 'Gangs of new york',
    posterImage: 'https://12.react.pages.academy/static/film/poster/Gangs_of_New_York_Poster.jpg',
    previewImage: 'https://12.react.pages.academy/static/film/preview/gangs_of_new_york.jpg',
    backgroundImage: 'https://12.react.pages.academy/static/film/background/gangs_of_new_york.jpg',
    backgroundColor: '#A6B7AC',
    description: 'In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his fathers killer.',
    rating: 8.8,
    scoresCount: 370881,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Cameron Diaz',
      'Daniel Day-Lewis'
    ],
    runTime: 167,
    genre: 'Crime',
    released: 2002,
    id: 5,
    isFavorite: false,
    videoLink: 'https://12.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://12.react.pages.academy/static/film/video/traffic.mp4'
  },

  {
    name: 'Once Upon a Time in America',
    posterImage: 'https://12.react.pages.academy/static/film/poster/Once_Upon_a_Time_in_America.jpg',
    previewImage: 'https://12.react.pages.academy/static/film/preview/Once_Upon_a_Time_in_America.jpg',
    backgroundImage: 'https://12.react.pages.academy/static/film/background/ones_upon_a_time_in_america.jpg',
    backgroundColor: '#CBAC79',
    description: 'A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.',
    rating: 9.9,
    scoresCount: 276395,
    director: 'Sergio Leone',
    starring: [
      'Robert De Niro',
      'James Woods',
      'Elizabeth McGovern'
    ],
    runTime: 229,
    genre: 'Crime',
    released: 1984,
    id: 6,
    isFavorite: false,
    videoLink: 'https://12.react.pages.academy/static/film/video/bubbles.mp4',
    previewVideoLink: 'https://12.react.pages.academy/static/film/video/dog.mp4'
  },
];

export const mockReviews: Reviews = [
  {
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed movies in years.',
    date: 'Fri Mar 10 2023 23:32:20 GMT+0300 (Moscow Standard Time)',
    id: 1,
    rating: 8.9,
    user: {
      id: 4,
      name: 'Kate Muir'
    }
  },

  {
    id: 2,
    user: {
      id: 13,
      name: 'Zak'
    },
    rating: 6.6,
    comment: 'This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.',
    date: '2023-02-25T07:31:25.015Z'
  },

  {
    id: 3,
    user: {
      id: 12,
      name: 'Isaac'
    },
    rating: 5.7,
    comment: 'I really find it difficult to believe this movie is rated highly by people. It`s hands down the worst movie I`ve seen in my life',
    date: '2023-02-26T07:31:25.015Z'
  },

  {
    id: 4,
    user: {
      id: 10,
      name: 'Max'
    },
    rating: 2,
    comment: 'I personally found this movie to be boring. Definitely one of the most boring movies I`ve ever seen.',
    date: '2023-02-26T07:31:25.015Z'
  },
];

export const mockUser: UserInfo = {
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: 2134,
  name: internet.userName(),
};
