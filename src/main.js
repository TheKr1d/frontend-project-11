import './style.css'

const form = document.querySelector('#rss-form')
const input = document.querySelector('#rss-url')
const content = document.querySelector('#content')


const renderMessage = (message, type) => {
  content.textContent = message;
  content.className = `small text-${type}`;
};

const validateUrl = (value) => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return Promise.reject(new Error('Поле не должно быть пустым'));
  }

  try {
    new URL(trimmed);
    return Promise.resolve(trimmed);
  } catch {
    return Promise.reject(new Error('Невалидный URL'));
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = input.value;

  validateUrl(value)
    .then(() => {
      renderMessage('RSS-канал успешно принят', 'success');
      input.value = '';
      input.focus();
    })
    .catch((error) => {
      renderMessage(error.message, 'danger');
    });
});