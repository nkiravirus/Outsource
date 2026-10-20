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

async function updateNepaliCalendarDate() {
  const dateParts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Kathmandu', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(new Date());
  const date = Object.fromEntries(dateParts.map(({ type, value }) => [type, value]));
  const query = new URLSearchParams({ year: date.year, month: date.month, day: date.day });
  try {
    const response = await fetch(`https://npdates.org/api/convert/ad-to-bs?${query}`);
    if (!response.ok) throw new Error('Nepali date service unavailable');
    const result = await response.json();
    const nepaliDate = result.bs?.formatted || result.bs?.nepali || result.bs?.date;
    if (!nepaliDate) throw new Error('Nepali date not returned');
    document.querySelector('#header-nepali-date').textContent = nepaliDate;
  } catch {
    document.querySelector('#header-nepali-date').textContent = 'Unavailable';
  }
}

updateNepaliCalendarDate();
