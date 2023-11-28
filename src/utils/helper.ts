export function convertToVND(number: number) {
  if (typeof number !== 'number') {
    return 'Invalid input';
  }

  const vndString = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number);

  return vndString;
}

export const getTimeAgo = (timestamp: number) => {
  let hours = (timestamp / (1000 * 60 * 60)).toFixed(0);

  return hours + ' hours';
};

export const getDate = (date: string) => {
  // Convert UTC timestamp to Date object
  const utcDate = new Date(date);

  // Create a formatter for the Indochina Time Zone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Bangkok', // Indochina Time Zone
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // 24-hour format
  });

  // Format the date in the Indochina Time Zone
  const indochinaTime = formatter.format(utcDate);

  return indochinaTime;
};
