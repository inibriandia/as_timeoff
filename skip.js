Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let today = new Date();
let curMont = {
  month: today.getMonth(),
  year: today.getFullYear(),
};

for (let i = 0; i <= 12; i++) {
  curMont = nextMonth(curMont);
  let firstDay = new Date(curMont.year, curMont.month, 1);
  let thirdWeekTuesday = firstDay.addDays(-firstDay.getDay() + 16);
  let thirdWeekThurday = thirdWeekTuesday.addDays(2);
  console.log(getDateString(thirdWeekTuesday));
  console.log(getDateString(thirdWeekThurday));
}

function nextMonth(date) {
  if (date.month === 11) return { year: ++date.year, month: 1 };
  return { ...date, month: ++date.month };
}

function getDateString(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
