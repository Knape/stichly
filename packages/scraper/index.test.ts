import {
  scrapeBrandsFromStore,
  scrapeProductLinksFromBrand,
  scrapeExtenedProduct,
  scrapeExtenedProducts,
  scrapePriceProduct,
  scrapePriceProducts,
} from "./index";

describe("Fetch expanded products", () => {
  it("should fetch product from caliroots", async () => {
    const payload = {
      url: "https://caliroots.com/collections/neighborhood/products/neighborhood-cord-windbreaker-jk-co-ny",
      storeUrl: "https://caliroots.com",
      store: "caliroots",
      delay: 1500,
    };

    const product = await scrapeExtenedProduct(payload);
    // Name
    expect(product).toHaveProperty("name");
    expect(product.name).not.toBeNull();
    // image
    expect(product).toHaveProperty("image");
    expect(product.image).not.toBeNull();
    // prices
    expect(product).toHaveProperty("price");
    expect(product.price).not.toBeNull();
    expect(product).toHaveProperty("discount");
    expect(product.discount).not.toBeNull();
  });
});

describe("scrapeProductLinksFromBrand", () => {
  it("should fetch product from caliroots", async () => {
    const payload = {
      url: "https://caliroots.com/collections/liberaiders",
      storeUrl: "https://caliroots.com",
      store: "caliroots",
      delay: 200,
    };

    const productLinks = await scrapeProductLinksFromBrand(payload);
    expect(productLinks.length).toBeGreaterThanOrEqual(10);
  });
});

describe("scrapeProductPriceFromBrand", () => {
  it("should fetch product from caliroots", async () => {
    const payload = {
      url: "https://caliroots.com/collections/neighborhood/products/neighborhood-cord-windbreaker-jk-co-ny",
      storeUrl: "https://caliroots.com",
      store: "caliroots",
      delay: 200,
    };

    const productPrice = await scrapePriceProduct(payload);
    expect(productPrice).toHaveProperty("price");
  });
});
