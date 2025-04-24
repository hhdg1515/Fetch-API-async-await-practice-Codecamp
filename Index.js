const apiKey = '3011f1ba83d24e689092de5336b9d0f3';
const url = 'https://api.rebrandly.com/v1/links';

const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

const shortenUrl = async () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({ destination: urlToShorten });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'apikey': apiKey
      },
      body: data
    });

    const jsonResponse = await response.json();

    const shortLink = jsonResponse.shortUrl;
    const linkElement = document.createElement('p');
    linkElement.innerHTML = `Shortened URL: <a href="https://${shortLink}" target="_blank">${shortLink}</a>`;
    responseField.appendChild(linkElement);
  } catch (error) {
    console.error('Error:', error);
    responseField.innerHTML = `<p>Oops! Something went wrong.</p>`;
  }
};

const displayShortUrl = (event) => {
  event.preventDefault();
  responseField.innerHTML = ''; // 更简洁的清空方式
  shortenUrl();
};

shortenButton.addEventListener('click', displayShortUrl);
