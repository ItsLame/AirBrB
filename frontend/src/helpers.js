/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid = validFileTypes.find((type) => type === file.type);

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    if (!valid) {
      reject(new Error('provided file is not a png, jpg or jpeg image.'));
    }
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

// read file convert to text
export const fileToText = (file) => {
  const validFileTypes = ['application/json'];
  const valid = validFileTypes.find((type) => type === file.type);

  const reader = new FileReader();
  const dataTextPromise = new Promise((resolve, reject) => {
    if (!valid) {
      reject(new Error('provided file is not a json.'));
    }
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsText(file);
  return dataTextPromise;
};

// add one day to a Date object
export const addOneDay = (date) => {
  return new Date(date.setDate(date.getDate() + 1));
};

// add one day to a Date object
export const minusOneDay = (date) => {
  return new Date(date.setDate(date.getDate() - 1));
};

// format a Date object to YYYY-MM-DD
export const formatDate = (date) => {
  return date.toLocaleDateString().split('/').reverse().join('-');
};

// get todays date in YYYY-MM-DD string format
export const getTodayDate = () => {
  return formatDate(new Date());
};

// currency formatter
export const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});
