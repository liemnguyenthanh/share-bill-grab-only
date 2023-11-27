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
