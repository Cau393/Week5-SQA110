// pages/ProductDetailPage.js
// Represents the /product_details/:id page on AutomationExercise.
//
// NOTE: This page is mostly a TODO for practice. Read the comments carefully —
//       each method stub explains exactly what to implement.

const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class ProductDetailPage extends BasePage {
    // ── URL helper ───────────────────────────────────────────────────────────
    // AutomationExercise product URLs look like: /product_details/1
    static urlFor(id) {
        return `https://automationexercise.com/product_details/${id}`;
    }

    // ── Locators ─────────────────────────────────────────────────────────────
    static PRODUCT_NAME = By.css(".product-information h2");
    static PRODUCT_PRICE = By.css(".product-information span span");
    static PRODUCT_CATEGORY = By.css(".product-information p:nth-child(3)");
    static PRODUCT_BRAND = By.css(".product-information p:nth-child(5)");
    static QUANTITY_INPUT = By.id("quantity");
    static ADD_TO_CART_BTN = By.css("button.cart");
    static VIEW_CART_LINK = By.css("u"); // the "View Cart" link in the modal
    static CONTINUE_SHOPPING_BTN = By.css("button.close-modal"); // dismiss the modal
    static WRITE_REVIEW_SECTION = By.css("#review-section");

    // ── Actions ──────────────────────────────────────────────────────────────

    /**
     * Navigate directly to a product detail page by its numeric ID.
     * @param {number} productId
     * @returns {Promise<void>}
     */
    async openById(productId) {
        await super.open(ProductDetailPage.urlFor(productId));
    }

    /**
     * Get the product name displayed on the detail page.
     * @returns {Promise<string>}
     */
    async getProductName() {
        return this.getText(ProductDetailPage.PRODUCT_NAME);
    }

    /**
     * Get the product price displayed on the detail page.
     * @returns {Promise<string>}  e.g. "Rs. 500"
     */
    async getProductPrice() {
        return this.getText(ProductDetailPage.PRODUCT_PRICE);
    }

    // ── TODO for practice ────────────────────────────────────────────────────

    // TODO 1: Implement `getProductCategory()`.
    //   - Use getText(ProductDetailPage.PRODUCT_CATEGORY).
    //   - The raw text looks like "Category: Women > Tops". Return the whole string.

    // TODO 2: Implement `getProductBrand()`.
    //   - Use getText(ProductDetailPage.PRODUCT_BRAND).
    //   - The raw text looks like "Brand: Polo". Return the whole string.

    // TODO 3: Implement `setQuantity(amount)`.
    //   - Clear the QUANTITY_INPUT field and type the given amount (as a string).
    //   - Hint: use `this.type(ProductDetailPage.QUANTITY_INPUT, String(amount))`.

    // TODO 4: Implement `addToCart()`.
    //   - Click ADD_TO_CART_BTN.
    //   - After clicking, a modal appears. Call `continueShopping()` to dismiss it.

    // TODO 5: Implement `continueShopping()`.
    //   - Click CONTINUE_SHOPPING_BTN to close the "Added to cart" modal.

    // TODO 6: Implement `viewCartFromModal()`.
    //   - Click VIEW_CART_LINK inside the modal (instead of dismissing it).
    //   - This navigates to /view_cart.
}

module.exports = ProductDetailPage;
