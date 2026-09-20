/* ====================================================================
   The quote footer
   ====================================================================
   .is-current ships on the first quote in the markup, so the footer
   still reads with this script off.
   ==================================================================== */

(function () {
  var TURN = 9000;

  var bar = document.querySelector('.quotebar');
  if (!bar) return;

  var quotes = bar.querySelectorAll('.quotebar__item');
  if (quotes.length < 2) return;

  var at = 0;
  var timer = null;
  var hovering = false;
  var focused = false;
  var held = false;

  function step() {
    quotes[at].classList.remove('is-current');
    at = (at + 1) % quotes.length;
    quotes[at].classList.add('is-current');
  }

  function sync() {
    if (hovering || focused || held) {
      clearInterval(timer);
      timer = null;
    } else if (!timer) {
      timer = setInterval(step, TURN);
    }
  }

  bar.addEventListener('mouseenter', function () { hovering = true; sync(); });
  bar.addEventListener('mouseleave', function () { hovering = false; sync(); });
  bar.addEventListener('focusin', function () { focused = true; sync(); });
  bar.addEventListener('focusout', function () { focused = false; sync(); });

  bar.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    held = !held;
    sync();
  });

  sync();
}());
