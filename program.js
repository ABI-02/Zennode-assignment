const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateDiscount(cartTotal, quantities, productPrices) {
  let flat10Discount = 0;
  let bulk5Discount = 0;
  let bulk10Discount = 0;
  let tiered50Discount = 0;

  if (cartTotal > 200) {
    flat10Discount = 10;
  }

  quantities.forEach((quantity, index) => {
    if (quantity > 10) {
      bulk5Discount = Math.max(bulk5Discount, 0.05 * productPrices[index]);
    }
  });


  if (quantities.reduce((acc, val) => acc + val, 0) > 20) {
    bulk10Discount = 0.10 * cartTotal;
  }

  if (
    quantities.reduce((acc, val) => acc + val, 0) > 30 &&
    quantities.some((quantity) => quantity > 15)
  ) {
    tiered50Discount = 0.50 * quantities.reduce((acc, val, index) => acc + (val > 15 ? productPrices[index] : 0), 0);
  }

  const maxDiscount = Math.max(flat10Discount, bulk5Discount, bulk10Discount, tiered50Discount);

  let discountName = "";
  let discountAmount = 0;

  if (maxDiscount === flat10Discount) {
    discountName = "flat_10_discount";
    discountAmount = flat10Discount;
  } else if (maxDiscount === bulk5Discount) {
    discountName = "bulk_5_discount";
    discountAmount = bulk5Discount;
  } else if (maxDiscount === bulk10Discount) {
    discountName = "bulk_10_discount";
    discountAmount = bulk10Discount;
  } else if (maxDiscount === tiered50Discount) {
    discountName = "tiered_50_discount";
    discountAmount = tiered50Discount;
  }

  return { discountName, discountAmount };
}

function main() {
  const productPrices = [20, 40, 50];
  const quantities = [];

  const promptQuantity = (i) => {
    rl.question(`Enter quantity for Product ${String.fromCharCode(65 + i)}: `, (answer) => {
      const quantity = parseInt(answer);
      quantities.push(quantity);

      if (i < 2) {
        promptQuantity(i + 1);
      } else {
        rl.close();
        processInput();
      }
    });
  };

  const processInput = () => {
    const giftWrapFee = quantities.reduce((acc, val) => acc + val, 0);
    const shippingFee = Math.floor(quantities.reduce((acc, val) => acc + val, 0) / 10) * 5;

    const subtotals = quantities.map((quantity, index) => quantity * productPrices[index]);
    const cartTotal = subtotals.reduce((acc, val) => acc + val, 0);

    const { discountName, discountAmount } = calculateDiscount(cartTotal, quantities, productPrices);

    const total = cartTotal - discountAmount + shippingFee + giftWrapFee;

   
    for (let i = 0; i < 3; i++) {
      console.log(`Product ${String.fromCharCode(65 + i)} - Quantity: ${quantities[i]}, Total: ${subtotals[i]}`);
    }

    console.log(`Subtotal: ${cartTotal}`);
    console.log(`Discount Applied: ${discountName} - Amount: ${discountAmount}`);
    console.log(`Shipping Fee: ${shippingFee}`);
    console.log(`Gift Wrap Fee: ${giftWrapFee}`);
    console.log(`Total: ${total}`);
  };

  promptQuantity(0);
}

main();
