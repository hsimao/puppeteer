const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
	let browser
	let page

	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})

		// 無恆模式
		const context = await browser.createIncognitoBrowserContext()

		page = await context.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async () => {
		await browser.close()
	})

	it('Desktop Device Test', async () => {
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto('https://www.example.com')
		await page.waitForTimeout(5000)
	})

	it('Tablet Device Test', async () => {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('https://www.example.com')
		await page.waitForTimeout(5000)
	})

	it('Mobile Device Test', async () => {
		const mobile = puppeteer.devices['iPhone X']
		await page.emulate(mobile)
		await page.goto('https://www.example.com')
		await page.waitForTimeout(5000)
	})
})
