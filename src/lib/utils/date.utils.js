const setDay = require('date-fns/setDay');
const getDay = require('date-fns/getDay');
const addWeeks = require('date-fns/addWeeks');

export const getLastWeekly = () => {
  const today = getDay(new Date());

  // If today is Monday or Tuesday, the last weekly was last week
  const wednesday = setDay(today === 1 || today === 2 ? addWeeks(new Date(), -1) : new Date(), 3, {weekStartsOn: 1});

  return wednesday;
};

export const getWeekly = (playlistDate) => {
  const day = getDay(playlistDate);

  // If wednesday, it is published at that date
  if (day === 3)  {
    return playlistDate;
  }

  const wednesday = setDay(playlistDate, 3, {weekStartsOn: 1});

  // If Monday or Tuesday, it is published on Wednesday the same week
  if (day === 1 || day === 2) {
    return wednesday;
  }

  // Else it is published the week after on Wednesday
  return addWeeks(wednesday, 1);
};
