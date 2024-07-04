import { fetchQuote } from './fetch-quote';
import { getCurrentDate } from './get-current-date';

function setQuote(author, quote) {
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');

  if (quoteText && quoteAuthor) {
    quoteAuthor.innerHTML = author;
    quoteText.innerHTML = quote;
  }
}

export async function fetchAndSetQuote() {
  const savedQuote = localStorage.getItem('quote');
  const currentDate = getCurrentDate();

  if(!savedQuote || JSON.parse(savedQuote).currentDate !== currentDate) {
    const { author, quote } = await fetchQuote();
    setQuote(author, quote);
    localStorage.setItem('quote', JSON.stringify({
      currentDate,
      author,
      quote,
    }));
    return;
  }

  const { author, quote } = JSON.parse(savedQuote);
  setQuote(author, quote);
}
