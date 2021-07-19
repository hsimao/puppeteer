const puppeteer = require('puppeteer')
const randomUseragent = require('random-useragent')
const path = require('path')
const fs = require('fs')

const url =
	'http://books.toscrape.com/catalogue/tipping-the-velvet_999/index.html'
const fileUrl = path.join(__dirname, '/log.txt')

;(async () => {
	// Open Browser
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	// Setup Broswer
	await page.setDefaultTimeout(10000)
	await page.setViewport({ width: 1200, height: 800 })
	await page.setUserAgent(randomUseragent.getRandom())

	// Get data from bookstore
	const nameSelector = '.product_main > h1'
	const priceSelector = '.product_main > p.price_color'
	await page.goto(url)
	await page.waitForSelector(nameSelector)
	await page.waitForSelector(priceSelector)

	let name = await page.$eval(nameSelector, e => e.innerHTML)
	let price = await page.$eval(priceSelector, e => e.innerHTML)
	name = name.trim()
	price = price.trim()

	// Get current date and time
	const date = new Date()
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const fullDate = `${day}/${month}/${year}`

	const bookText = `${fullDate} - ${name} - ${price}\n`
	console.log(bookText)

	// Save data to the textFile
	const logger = fs.createWriteStream(fileUrl, { flags: 'a' })
	logger.write(bookText)
	logger.close()

	// Close Browser
	await browser.close()
})().catch(error => {
	console.log(error)
	process.exit(1)
})
