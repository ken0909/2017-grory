export const getLocalStorageItem = (key = '') => {
  const ret = localStorage.getItem(key);
  if (ret) {
    return JSON.parse(ret);
  }
  return false;
};
export const setLocalStorage = (key = '', val = {}) => {
  try {
    const jsonStringifiedData = JSON.stringify(val);
    if (getLocalStorageItem(key) !== jsonStringifiedData) {
      localStorage.setItem(key, jsonStringifiedData);
    }
  } catch (e) {
    return false;
  }
  return true;
};
export const addLocalStorageItem = (key = '', val = {}) => {
  const localStorageVal = this.get(key);
  localStorageVal.push(val);
  try {
    JSON.stringify(localStorageVal);
  } catch (err) {
    return false;
  }
  return true;
};
export const deleteLocalStorageItem = (key = '', index = null) => {
  const localStorageVal = this.get(key);
  if (!index) {
    index = localStorageVal.length - 1;
  }
  localStorageVal.splice(index, index);
  this.set(JSON.stringify(localStorageVal));
};
export const removeLocalStorageItem = (key = '') => {
  localStorage.removeItem(key);
};
