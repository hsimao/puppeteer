const puppeteer = require('puppeteer')
const percySnapshot = require('@percy/puppeteer')

describe('Percy Visual Test', () => {
	let browser, page

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	test('Full page Percy Snapshot', async () => {
		await page.goto('https://www.example.com/')
		await page.waitForSelector('h1')
		await percySnapshot(page, 'Example Page')
	})
})
