export const formatBytes = (value) => {
  if (value === 0) return '0 Bytes';

  const k = 1000;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(value) / Math.log(k));

  return parseFloat((value / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const formatBits = (value) => {
  if (value === 0) return '0 Bits';

  const k = 1000;
  const sizes = ['Bits', 'kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const i = Math.floor(Math.log(value) / Math.log(k));

  return parseFloat((value / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const formatDateTime = (value) => {
  return (new Date(value)).toLocaleString();
}

export const formatDate = (value) => {
  return (new Date(value)).toLocaleDateString();
}

export const formatTime = (value) => {
  return (new Date(value)).toLocaleTimeString();
}
