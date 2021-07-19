const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	// 整頁快照
	test('Full Page Snapshot', async () => {
		await page.goto('https://www.example.com/')
		await page.waitForSelector('h1')
		const image = await page.screenshot()

		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'pixel', // 像素比對
			failureTreshold: 500, // 差異範圍
		})
	})

	// 單一元素快照
	test('Single Element Snapshot', async () => {
		await page.goto('https://www.example.com/')
		const h1 = await page.waitForSelector('h1')
		const image = await h1.screenshot()

		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'percent', // 百分比
			failureTreshold: 0.01, // 差異範圍
		})
	})

	// 手機裝置快照
	test('Mobile Snapshot', async () => {
		await page.goto('https://www.example.com/')
		await page.emulate(puppeteer.devices['iPhone X'])
		await page.waitForSelector('h1')

		const image = await page.screenshot()

		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'percent', // 百分比
			failureTreshold: 0.01, // 差異範圍
		})
	})

	// iPad 裝置快照
	test('Tablet Snapshot', async () => {
		await page.goto('https://www.example.com/')
		await page.emulate(puppeteer.devices['iPad landscape'])
		await page.waitForSelector('h1')

		const image = await page.screenshot()

		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'percent', // 百分比
			failureTreshold: 0.01, // 差異範圍
		})
	})

	// 使用場景, 排除動態資料完後才快照, 可避免動態資料差異增加快照比對失準
	test.only('Remove Element Before Snapshot', async () => {
		await page.goto('https://www.example.com/')

		// 將 h1 標籤隱藏
		await page.evaluate(() => {
			// 直接刪除元素, 不佔位
			// ;(document.querySelectorAll('h1') || []).forEach(el => el.remove())

			// 將元素設定為透明, 佔位
			;(document.querySelectorAll('h1') || []).forEach(
				el => (el.style.opacity = 0)
			)
		})

		await page.waitForTimeout(5000)
	})
})
