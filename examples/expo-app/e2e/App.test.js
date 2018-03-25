import { reloadApp } from "detox-expo-helpers";

describe("App e2e", () => {
  beforeEach(async () => {
    await reloadApp();

    // FIXME: Detox hangs if we don't wait a little bit here.
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  it("should have instructions", async () => {
    await expect(element(by.id("instructions"))).toBeVisible();
  });

  it("button press increases coverage", async () => {
    await element(by.id("increaseCoverage")).tap();
  });
});
