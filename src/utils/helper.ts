import { DataRowType } from "@/components/molecules";
import { THOUSAND } from "@/constants";
import { DishType } from "@/types";

const checkOptionalDish = (text: string) => {
  const regex = /\b\d+x\b/; // Matches a number followed by 'x'
  return regex.test(text);
};

const adjustedNumberHasDot = (numText: string) => {
  let numericValue = (numText.replace(/[^\d.-]/g, ''));

  return numericValue.includes('.') ? parseFloat(numericValue) * (THOUSAND) : parseFloat(numericValue)
}

export function parseBillItems(input: string[]) {
  const parsedItems: DishType[] = [];
  let index = 0

  while (index < input.length) {
    let count = 1

    const item = input[index]
    // Example: '1x Cơm Thị Kho Hột Vịt 45.000' =>>> get '1x'
    const textArr = item.split(' ') // Example: ["1x", "Cơm", "Thị", "Kho", "Hột", "Vịt", "45.000"]
    const quantity = textArr[0] // '1x'
    const price = textArr[textArr.length - 1] //'45.000', sometime data is wrong like that: 45000

    // check next item is optional
    const checkOptionalItem = (optionals: string[]) => {
      const itemCheck = input[index + count]
      if (itemCheck) {
        const hasQuality = checkOptionalDish(itemCheck.split(' ')[0])

        if (!hasQuality) {
          optionals.push(itemCheck)
          count++
          checkOptionalItem(optionals)
        }
      }
      return optionals
    }

    let name = item
      .replace(quantity, '')
      .replace(price, '')
    .trim();

    const optionals = checkOptionalItem([])
    if (optionals) {
      name += ` ${optionals.join('\n')}`
    }

    index += count

    // calc price of dish
    const adjustedPrice = adjustedNumberHasDot(price)
    const priceOfDish = adjustedPrice / parseFloat(quantity)

    parsedItems.push({
      amount: parseFloat(quantity),
      name,
      price: priceOfDish
    });
  }

  return parsedItems;
}

export function parseBillDetails(input: string[]) {
  let subtotal = 0;
  let shipping = 0;
  let discount = 0

  input.forEach((item, index) => {
    const textArr = item.split(' ')
    const price = adjustedNumberHasDot(textArr[textArr.length - 1])

    //subtotal
    if (index === 0) {
      subtotal = price
    }

    // Applicable fees
    if (index === 1) {
      shipping = price
    }

    // Check for discount lines
    if (index !== 0 && index !== 1) {
      let adjustedDiscount = Math.abs(price)
      console.log({ price, adjustedDiscount, text: textArr[textArr.length - 1] });


      discount += adjustedDiscount
    }
  })

  return {
    subtotal,
    shipping,
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

export const getTotalMoneyFinal = (list: DataRowType[]) => {
  return list.reduce((c, a) => (c += a.finalPrice), 0)
}