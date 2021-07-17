const puppeteer = require('puppeteer')

describe('Currency Exchange Test', () => {
	let browser, page

	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 20,
			devtools: false,
			ignoreHTTPSErrors: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)

		await page.goto('http://zero.webappsecurity.com/login.html')
		await page.waitForSelector('#login_form')
		await page.type('#user_login', 'username')
		await page.type('#user_password', 'password')
		await page.click('#user_remember_me')
		await page.click('input[type="submit"]')

		// 詢問是否訪問不安全網頁, 點擊「進階」
		await page.waitForSelector('#details-button')
		await page.click('#details-button')
		// 點擊「前往」
		await page.waitForSelector('#proceed-link')
		await page.click('#proceed-link')
	})

	after(async () => {
		await browser.close()
	})

	it('Display Currency Exchange Form', async () => {
		await page.waitForSelector('.nav-tabs')
		await page.click('#pay_bills_tab')
		await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
		await page.click('#tabs > ul > li:nth-child(3) > a')
		await page.waitForSelector('.board')
	})

	it('Exchange Currency', async () => {
		await page.select('#pc_currency', 'GBP')
		await page.type('#pc_amount', '800')
		await page.click('#pc_inDollars_true')
		await page.click('#purchase_cash')
		await page.waitForSelector('#alert_content')
	})
})
