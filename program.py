def calculate_discount(cart_total, quantities, product_prices):
    flat_10_discount = 0
    bulk_5_discount = 0
    bulk_10_discount = 0
    tiered_50_discount = 0

    if cart_total > 200:
        flat_10_discount = 10

    for quantity in quantities:
        if quantity > 10:
            bulk_5_discount = max(bulk_5_discount, 0.05 * product_prices[quantities.index(quantity)])


    if sum(quantities) > 20:
        bulk_10_discount = 0.10 * cart_total

    if sum(quantities) > 30 and any(quantity > 15 for quantity in quantities):
        tiered_50_discount = 0.50 * sum(product_prices[quantities.index(quantity)] for quantity in quantities if quantity > 15)


    max_discount = max(flat_10_discount, bulk_5_discount, bulk_10_discount, tiered_50_discount)

    discount_name = ""
    discount_amount = 0

    if max_discount == flat_10_discount:
        discount_name = "flat_10_discount"
        discount_amount = flat_10_discount
    elif max_discount == bulk_5_discount:
        discount_name = "bulk_5_discount"
        discount_amount = bulk_5_discount
    elif max_discount == bulk_10_discount:
        discount_name = "bulk_10_discount"
        discount_amount = bulk_10_discount
    elif max_discount == tiered_50_discount:
        discount_name = "tiered_50_discount"
        discount_amount = tiered_50_discount

    return discount_name, discount_amount


def main():
    product_prices = [20, 40, 50]
    quantities = []

    for i in range(3):
        quantity = int(input(f"Enter quantity for Product {chr(65 + i)}: "))
        quantities.append(quantity)

    gift_wrap_fee = sum(quantities)
    shipping_fee = (sum(quantities) // 10) * 5

    subtotals = [quantity * product_prices[i] for i, quantity in enumerate(quantities)]
    cart_total = sum(subtotals)

    discount_name, discount_amount = calculate_discount(cart_total, quantities, product_prices)

    total = cart_total - discount_amount + shipping_fee + gift_wrap_fee

    
    for i in range(3):
        print(f"Product {chr(65 + i)} - Quantity: {quantities[i]}, Total: {subtotals[i]}")

    print(f"Subtotal: {cart_total}")
    print(f"Discount Applied: {discount_name} - Amount: {discount_amount}")
    print(f"Shipping Fee: {shipping_fee}")
    print(f"Gift Wrap Fee: {gift_wrap_fee}")
    print(f"Total: {total}")


if __name__ == "__main__":
    main()
