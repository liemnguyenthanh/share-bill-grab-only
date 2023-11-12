export function parseBillItems(input: string[]) {
  const parsedItems = [];

  for (const item of input) {
    const quantityRegex = /(\d+)\s*x\s+/;
    const priceRegex = /(\d+(\.\d{3})*)$/;

    const quantityMatch = item.match(quantityRegex);
    const priceMatch = item.match(priceRegex);

    if (quantityMatch && priceMatch) {
      const quantity = parseInt(quantityMatch[1], 10);
      const price = priceMatch[0];
      const name = item
        .replace(quantityMatch[0], '')
        .replace(priceMatch[0], '')
        .trim();

      parsedItems.push({
        amount: quantity,
        name,
        price: parseFloat(price) * 1000 / quantity,
      });
    }
  }

  return parsedItems;
}

export function parseBillDetails(input: any[]) {
  let subtotal = 0;
  let shipping = 0;
  let discount: number[] = [];

  input.forEach((item, index) => {
    // Check for the subtotal and shipping fees
    if (index === 0) {
      subtotal = parseFloat(item.split(" ")[1]);
    }

    if (index === 1) {
      const shippingMatch = item.match(/\d+\.\d+/);
      if (shippingMatch) {
        shipping = parseFloat(shippingMatch[0]);
      }
    }

    // Check for discount lines
    if (index !== 0 && index !== 1) {
      const discountAmount = parseFloat(item.match(/-[\d.]+/)[0]);
      discount.push(discountAmount * 1000);
    }
  })

  return {
    subtotal: parseFloat(Number(subtotal * 1000).toFixed(0)),
    shipping: shipping * 1000,
    discount,
  };
}

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

export function classnames(...classes: Array<string | boolean | undefined>): string {
  return classes.filter((classname) => typeof classname === 'string').join(' ');
}


