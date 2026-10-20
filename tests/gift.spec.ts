import { expect, test, type Page } from "@playwright/test";

async function openGift(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Mở món quà" }).click();
  await expect(page.getByRole("heading", { name: /Gửi chị một chút/ })).toBeVisible();
}

test("complete gift journey, flowers, wishes and accessible dialogs", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await openGift(page);
  await page.getByRole("button", { name: "Đọc lời chúc" }).click();
  await expect(page.getByText("Gửi chị thân mến,")).toBeVisible();
  await expect(page.locator(".greeting-letter")).toContainText("luôn hạnh phúc theo cách của riêng mình");
  await page.getByRole("button", { name: "Chạm hoa hồng 2 để nhận lời chúc" }).click();
  await expect(page.locator(".flower-message")).toHaveText("Mong chị luôn xinh đẹp, bình an và gặp nhiều may mắn.");
  await page.getByRole("button", { name: "Mở tấm thiệp" }).click();
  const card = page.getByRole("dialog", { name: "Tấm thiệp dành riêng cho chị" });
  await expect(card).toBeVisible();
  await expect(card).toContainText("Cảm ơn chị vì đã là một người chị thân thiết");
  await page.keyboard.press("Escape");
  await expect(card).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Mở tấm thiệp" })).toBeFocused();
  await page.getByRole("button", { name: "Mở tấm thiệp" }).click();
  await page.getByRole("button", { name: "Đóng tấm thiệp" }).click();
  await page.getByRole("button", { name: "Tặng chị một bó hoa" }).click();
  await expect(page.getByRole("dialog")).toContainText("Bó hoa này em gửi tặng chị");
  await page.getByRole("button", { name: "Chị nhận hoa nhé" }).click();
  const wishes = new Set<string>();
  let previous = "";
  for (let i = 0; i < 20; i++) {
    await page.getByRole("button", { name: "Một lời chúc nhỏ" }).click();
    const current = await page.locator(".random-wish>p").innerText();
    expect(current).not.toEqual(previous);
    wishes.add(current); previous = current;
  }
  expect(wishes.size).toBeGreaterThan(4);
  await page.getByRole("button", { name: "Còn một điều em muốn gửi chị" }).click();
  await expect(page.getByRole("dialog")).toContainText("Mong chị luôn hạnh phúc, không chỉ trong ngày hôm nay");
  await page.getByRole("button", { name: "Quay lại khu vườn" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("effect controls and optional music playback", async ({ page }) => {
  let musicRequests = 0;
  page.on("request", request => { if (request.url().includes("/music/lgt.mp3")) musicRequests++; });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(musicRequests).toBe(0);
  await page.getByRole("button", { name: "Nhạc: tắt" }).click();
  await expect(page.getByRole("button", { name: "Nhạc: đang phát" })).toHaveAttribute("aria-pressed", "true");
  expect(musicRequests).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Nhạc: đang phát" }).click();
  await expect(page.getByRole("button", { name: "Nhạc: tắt" })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Cài đặt hiệu ứng" }).click();
  const petals = page.getByRole("switch", { name: "Cánh hoa bay" });
  await petals.click();
  await expect(petals).toHaveAttribute("aria-checked", "false");
  await expect(page.locator(".falling-petals")).toHaveCount(0);
  await petals.click();
  await expect(page.locator(".falling-petals>span")).toHaveCount(14);
  const wind = page.getByRole("switch", { name: "Gió theo con trỏ" });
  await wind.click();
  await expect(wind).toHaveAttribute("aria-checked", "false");
  await page.getByRole("button", { name: "Cài đặt hiệu ứng" }).click();
  await openGift(page);
});

test("missing music file reports an error and keeps the gift usable", async ({ page }) => {
  await page.route("**/music/lgt.mp3", route => route.fulfill({ status: 404, body: "Missing test audio" }));
  await page.goto("/");
  await page.getByRole("button", { name: "Nhạc: tắt" }).click();
  await expect(page.locator(".music-notice")).toContainText(/Chưa tải được nhạc|Chưa phát được nhạc/);
  await expect(page.getByRole("button", { name: "Nhạc: tắt" })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Đóng thông báo nhạc" }).click();
  await page.getByRole("button", { name: "Mở món quà" }).click();
  await expect(page.locator(".greeting-hero")).toBeVisible();
});

for (const width of [360, 390, 430, 768, 1024, 1440]) {
  test(`responsive layout and usable card at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole("button", { name: "Mở món quà" }).click();
    await expect(page.locator(".greeting-hero")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const clippedText = await page.locator("h1,h2,.greeting-letter>p,.button").evaluateAll(elements => elements.filter(element => element.scrollWidth > element.clientWidth + 1).map(element => element.textContent));
    expect(clippedText).toEqual([]);
    await page.getByRole("button", { name: "Mở tấm thiệp" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const close = page.getByRole("button", { name: "Đóng", exact: true });
    const rect = await close.boundingBox();
    expect(rect).not.toBeNull();
    expect(rect!.x).toBeGreaterThanOrEqual(0);
    expect(rect!.y).toBeGreaterThanOrEqual(0);
    expect(rect!.x + rect!.width).toBeLessThanOrEqual(width);
    await page.getByRole("button", { name: "Đóng tấm thiệp" }).click();
    await page.getByRole("button", { name: "Còn một điều em muốn gửi chị" }).click();
    await expect(page.getByRole("button", { name: "Quay lại khu vườn" })).toBeVisible();
    await page.getByRole("button", { name: "Quay lại khu vườn" }).click();
    await page.screenshot({ path: `artifacts/website-${width}.png`, fullPage: true });
  });
}

test("reduced motion and keyboard entry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".falling-petals")).toBeHidden();
  await page.getByRole("button", { name: "Mở món quà" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".main-content")).toBeFocused();
  await expect(page.locator(".garden-flower").first()).toHaveCSS("animation-name", "none");
  await page.getByRole("button", { name: "Mở tấm thiệp" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Mở tấm thiệp" })).toBeFocused();
});
