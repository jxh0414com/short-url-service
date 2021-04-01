const shortRegex = /^[a-zA-Z0-9-_]+$/;
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

exports.validateShort = (data) => {
  if (Object.keys(data).length <= 0) return;

  const errors = {};

  if (!data.fullURL) {
    errors.fullURL = "URL is required to shorten. URL cannot be empty";
  } else if (!data.fullURL.match(urlRegex)) {
    errors.fullURL = "Please enter a valid url link";
  }
  if (data.shortURL && data.shortURL.length < 6) {
    errors.shortURL =
      "Shorten have to be short but cannot be too short. Minimum 6 characters including dash and underscore";
  } else if (data.shortURL && !data.shortURL.match(shortRegex)) {
    errors.shortURL =
      "Shorten url can only contain letters, numbers, dash, and underscore";
  }

  return {
    errors,
    isValid: Object.keys(errors).length <= 0,
  };
};
