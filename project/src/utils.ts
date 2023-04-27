import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getFilmRating = (rating: number) => {
  if (rating > 0 && rating < 3) {
    return 'Bad';
  }
  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }
  if (rating >= 5 && rating < 8) {
    return 'Good';
  }
  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }
  if (rating === 10) {
    return 'Awesom';
  }
};

export const getTimeFromMins = (mins: number) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

export const formatTime = (timeleft: number) : string => {
  const dur = dayjs.duration(timeleft, 'seconds');
  return dur.format(`[-]${dur.hours() === 0 ? '' : 'HH[:]'}${dur.minutes() === 0 ? '00:' : 'mm[:]'}ss`);
};

