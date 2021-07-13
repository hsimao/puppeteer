const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('等待元素消失', async () => {
	let browser = null
	let page = null

	before(async () => {
		console.log('before')
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 20,
			devtools: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async () => {
		console.log('after')
		await browser.close()
	})

	// 每個 it 執行之前跑一次
	beforeEach(async () => {
		console.log('beforeEach')
	})

	// 每個 it 執行完後跑一次
	afterEach(async () => {
		console.log('afterEach')
	})

	it('wait dom hide', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')

		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')

		// 等到 signin_button 按鈕消失, 方法一
		// await page.waitFor(() => !document.querySelector('#signin_button'))

		// 等到 signin_button 按鈕消失, 方法二
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 3000,
		})
	})
})
