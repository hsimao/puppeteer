const puppeteer = require('puppeteer')

describe('Login Test', () => {
	let browser, page

	before(async () => {
		browser = await puppeteer.launch({
			ignoreHTTPSErrors: true,
			headless: false,
			slowMo: 0,
			devtools: false,
			ignoreHTTPSErrors: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(100000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async () => {
		await browser.close()
	})

	it('Login Test - Invalid Credentials', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#signin_button')

		await page.click('#signin_button')
		await page.waitForSelector('#login_form')

		await page.type('#user_login', 'invalid creds')
		await page.type('#user_password', 'invalid password')
		await page.click('#user_remember_me')
		await page.click('input[type="submit"]')

		await page.waitForSelector('.alert-error')
	})

	it('Login Text - Valid Credentials', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#signin_button')

		await page.click('#signin_button')
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

		await page.waitForSelector('#settingsBox')
	})
})
