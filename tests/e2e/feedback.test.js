const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Feedback Test', () => {
	let browser, page

	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 0,
			devtools: false,
			ignoreHTTPSErrors: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async () => {
		await browser.close()
	})

	it('Display Feedback Form', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#feedback')
		await page.click('#feedback')
	})

	it('Submit Feedback Form', async () => {
		await page.waitForSelector('form')
		await page.type('#name', 'Name')
		await page.type('#email', 'test@gmail.com')
		await page.type('#subject', 'Subject')
		await page.type('#comment', 'Just a message into the textarea')
		await page.click('input[type="submit"]')
	})

	it('Display Results Page', async () => {
		await page.waitForSelector('#feedback-title')
		const url = await page.url()
		expect(url).to.include('/sendFeedback.html')
	})
})
