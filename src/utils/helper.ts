import { defaultImage, userData } from '@/constants';

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

export function findClosestMatch(inputName: string) {
  // Initialize variables to keep track of the closest match
  let closestMatch = '';
  let minDistance = Infinity;

  // Loop through each user in the userData array
  userData.forEach((user) => {
    // Loop through each name in the user's name array
    user.name.forEach((name) => {
      // Calculate the Levenshtein distance between the inputName and the current name
      const distance = calculateLevenshteinDistance(inputName, name);

      // Update closestMatch if the current distance is smaller
      if (distance < minDistance) {
        console.log(distance);
        minDistance = distance;
        closestMatch = user.url;
      }
    });
  });

  // Check if the match is at least 80%
  if ((inputName.length - minDistance) / inputName.length >= 0.8) {
    // Return the closest match
    return closestMatch;
  } else {
    // Return the default URL
    return defaultImage;
  }
}

// Function to calculate Levenshtein distance between two strings
export function calculateLevenshteinDistance(str1: string | any[], str2: string | any[]) {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store the distances
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize the first row and column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill in the rest of the array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  // Return the Levenshtein distance between the two strings
  return dp[m][n];
}
