Swag Labs Store - Playwright JavaScript Project 👩🏻‍💻

This project is designed to test functionalities of the Swag Labs Store using Playwright. 🛒

---

Test Coverage

Authentication:
- Login with valid credentials
- Login as a locked-out user
- Login without a password
- Login without a username
- Login with incorrect password
- Login with invalid username

Item Sorting:
- Sorting items by name: A–Z
- Sorting items by name: Z–A
- Sorting items by price: low-to-high
- Sorting items by price: high-to-low

Shopping Flow:
- Adding a random item to the cart
- Adding all items to the cart, removing all but one random item

Product Page:
- Checking that price, name, and picture are displayed for every item

Log Out:
- Logging out (coming soon)

Checkout Flow:
- Complete the order and receive confirmation
- Ensuring user cannot proceed without entering first name, last name, and zip code

Price Calculation:
- Checking if total price and tax are calculated correctly

---

Tools and Technologies Used

Playwright + Playwright Test Runner

Programming Language: JavaScript (Node.js)

Editor: VS Code or any modern JS IDE

---

Running the Tests

```bash
npm install
npx playwright test

