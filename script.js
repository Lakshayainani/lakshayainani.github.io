// Keep native anchor navigation aligned with the responsive header.
const header = document.querySelector('.site-header');
const syncNavHeight = () => document.documentElement.style.setProperty('--nav-height', `${header.getBoundingClientRect().height}px`);
syncNavHeight();
new ResizeObserver(syncNavHeight).observe(header);
// History restoration can restore an old scroll offset after changing the hash.
window.addEventListener('hashchange', () => requestAnimationFrame(() => {
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ block: 'start', behavior: 'auto' });
  else if (!location.hash) window.scrollTo({ top: 0, behavior: 'auto' });
}));

const terminal = document.querySelector('#terminal');
const command = document.querySelector('#command');
const output = document.querySelector('#terminal-output');
const toast = document.querySelector('#toast');
const foundBugs = new Set();
let toastTimer;
function notify(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4500);
}
function openTerminal() {
  if (terminal.open) return;
  terminal.showModal();
  document.body.classList.add('terminal-open');
  command.focus();
}
document.querySelectorAll('[data-open-terminal]').forEach(button => button.addEventListener('click', openTerminal));
document.querySelector('#close-terminal').addEventListener('click', () => terminal.close());
terminal.addEventListener('close', () => document.body.classList.remove('terminal-open'));
function toggleMatrix() {
  return document.body.classList.toggle('matrix') ? 'You took the green pill. Matrix mode enabled.' : 'Back to the ordinary kind of extraordinary.';
}
document.querySelectorAll('[data-bug]').forEach(button => button.addEventListener('click', () => {
  foundBugs.add(button.dataset.bug);
  button.textContent = '✓';
  button.disabled = true;
  button.setAttribute('aria-label', `Bug ${button.dataset.bug} caught`);
  notify(foundBugs.size === 3 ? '3/3 bugs caught. Honorary QA engineer unlocked. 🏆' : `Bug caught! ${foundBugs.size}/3 — keep that curious eye open.`);
}));
function printLine(text, className = '') {
  const line = document.createElement('p');
  line.textContent = text;
  line.className = className;
  output.append(line);
  // ponytail: last 80 lines only; add persistent scrollback if this becomes a real console.
  while (output.children.length > 80) output.firstElementChild.remove();
  output.scrollTop = output.scrollHeight;
}
document.querySelector('#terminal-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = command.value.trim().toLowerCase();
  command.value = '';
  if (!input) return;
  printLine(`visitor ❯ ${input}`, 'terminal-command');
  const replies = {
    help: 'whoami   Meet the human\nwork     What I work on\nbugs     A hint for the bug hunt\ncoffee   Refuel the engineer\nmatrix   Change the atmosphere\nclear    A fresh start\nexit     Back to the portfolio',
    whoami: 'Lakshaya Inani. Senior SDET at Tickertape.\nBangalore, India. Professionally curious.\nI turn “what if?” into a repeatable test.',
    work: 'API automation · UI and mobile testing · CI/CD\nExplore the Work section for the details.',
    bugs: `${foundBugs.size}/3 caught. Look for the little outlined bugs.\nOne near the code. One along the journey. One at the very end.`,
    coffee: '   ( (\n    ) )\n  .------.\n  |      |]\n  \\______/\n\n418: I’m a teapot. Coffee is an unhandled dependency. ☕'
  };
  if (input === 'clear') output.replaceChildren();
  else if (input === 'exit') terminal.close();
  else if (input === 'matrix') printLine(toggleMatrix());
  else printLine(Object.hasOwn(replies, input) ? replies[input] : `Command not found: ${input}. Try help.`);
});
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let keyHistory = [];
document.addEventListener('keydown', event => {
  if (event.target.closest('input, textarea, select, [contenteditable="true"]') || event.ctrlKey || event.metaKey || event.altKey || event.repeat || terminal.open) return;
  if (event.key === '`' || event.key === '~') {
    event.preventDefault();
    openTerminal();
    return;
  }
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  keyHistory = [...keyHistory, key].slice(-konami.length);
  if (keyHistory.join(',') === konami.join(',')) { notify(toggleMatrix()); keyHistory = []; }
});
const runButton = document.querySelector('#run-tests');
runButton.addEventListener('click', async () => {
  runButton.disabled = true;
  const lines = document.querySelectorAll('#test-output p');
  const summary = document.querySelector('#test-summary');
  summary.textContent = 'Running demo…';
  for (const line of lines) line.style.opacity = '.3';
  try {
    for (const line of lines) { await new Promise(resolve => setTimeout(resolve, 350)); line.style.opacity = '1'; }
    summary.textContent = '3 passed · illustrative test run';
  } finally { runButton.disabled = false; }
});
function updateTime() {
  const now = new Date();
  const clock = document.querySelector('#local-time');
  clock.textContent = `${new Intl.DateTimeFormat('en-GB', {timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false}).format(now)} IST`;
  clock.dateTime = now.toISOString();
  document.querySelector('#year').textContent = now.getFullYear();
}
updateTime();
setInterval(updateTime, 60000);
console.info('Curiosity looks good on you. Try the ~ key, or ↑ ↑ ↓ ↓ ← → ← → B A.');

const launchPlane = document.querySelector('#launch-plane');
launchPlane.addEventListener('click', async () => {
  launchPlane.disabled = true;
  const plane = document.querySelector('#paper-plane');
  const sendoff = document.querySelector('.sendoff');
  const message = document.querySelector('#flight-message');
  sendoff.classList.remove('delivered');
  message.textContent = 'One small hello, on its way…';
  plane.style.offsetDistance = '0%';
  try {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      await plane.animate([{ offsetDistance: '0%' }, { offsetDistance: '100%' }], {
        duration: 2200, easing: 'ease-in-out'
      }).finished;
    }
    plane.style.offsetDistance = '100%';
    sendoff.classList.add('delivered');
    message.textContent = 'Hello received. The best connections start with a little curiosity. ✨';
    launchPlane.textContent = 'One more hello ↗';
  } finally { launchPlane.disabled = false; }
});
