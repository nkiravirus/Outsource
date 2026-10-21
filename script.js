const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const careersLink = document.querySelector('#careers');
const careersDialog = document.querySelector('#careers-dialog');

careersLink.addEventListener('click', (event) => {
  event.preventDefault();
  careersDialog.showModal();
});

careersDialog.addEventListener('click', (event) => {
  if (event.target === careersDialog) careersDialog.close();
});

const nepalDate = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kathmandu',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
const nepalTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kathmandu',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});
function updateHeaderClock() {
  const now = new Date();
  document.querySelector('#header-date').textContent = nepalDate.format(now);
  document.querySelector('#header-time').textContent = nepalTime.format(now);
}

updateHeaderClock();
window.setInterval(updateHeaderClock, 1000);

const bsMonthStarts2083 = [
  ['2026-04-14', 'बैशाख'], ['2026-05-15', 'जेठ'], ['2026-06-15', 'असार'],
  ['2026-07-17', 'साउन'], ['2026-08-17', 'भदौ'], ['2026-09-17', 'असोज'],
  ['2026-10-18', 'कार्तिक'], ['2026-11-17', 'मंसिर'], ['2026-12-16', 'पुष'],
  ['2027-01-15', 'माघ'], ['2027-02-13', 'फागुन'], ['2027-03-15', 'चैत'],
].map(([start, month]) => ({ start: Date.parse(`${start}T00:00:00Z`), month }));
const nepaliDigits = new Intl.NumberFormat('ne-NP', { useGrouping: false });

function updateNepaliCalendarDate() {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Kathmandu', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(new Date());
  const date = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const gregorianMidnight = Date.UTC(Number(date.year), Number(date.month) - 1, Number(date.day));
  const nextBsNewYear = Date.UTC(2027, 3, 14);
  const firstBsNewYear = Date.UTC(2026, 3, 14);
  let formatted = '2083 को पात्रो मात्र';

  if (gregorianMidnight >= firstBsNewYear && gregorianMidnight < nextBsNewYear) {
    const currentMonth = bsMonthStarts2083.reduce((latest, month) => month.start <= gregorianMidnight ? month : latest, null);
    const day = Math.floor((gregorianMidnight - currentMonth.start) / 86400000) + 1;
    formatted = `${currentMonth.month} ${nepaliDigits.format(day)} ${nepaliDigits.format(2083)}`;
  }

  document.querySelector('#header-nepali-date').textContent = formatted;
}

updateNepaliCalendarDate();
window.setInterval(updateNepaliCalendarDate, 60000);
