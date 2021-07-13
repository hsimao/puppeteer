const puppeteer = require('puppeteer')
const expect = require('chai').expect
const {
	getCount,
	getText,
	click,
	shouldNotExist,
	inputValue,
	waitForText,
} = require('../lib/helpers.js')

// 選擇 dom, 判斷網頁是否已經正常開啟
// describe('My First Puppeteer Test', () => {
// 	it('should launch the browser', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 10,
// 			devtools: true,
// 		})
// 		const page = await browser.newPage()
// 		await page.goto('https://www.google.com/')
// 		await page.waitForTimeout(3000)
// 		await page.waitForSelector('.gLFyf.gsfi')
// 		await page.reload()
// 		await page.waitForTimeout(3000)
// 		await page.waitForSelector('.gLFyf.gsfi')
// 		await browser.close()
// 	})
// })

// // 回上一頁、往前一頁
// describe('goback and goforward', () => {
// 	it('should launch the browser', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 10,
// 			devtools: false,
// 		})
// 		const page = await browser.newPage()
// 		await page.goto('https://www.google.com/')
// 		await page.waitForSelector('.gLFyf.gsfi')

// 		await page.goto('https://dev.to/')
// 		await page.waitForSelector('.crayons-header')

// 		await page.goBack()
// 		await page.waitForSelector('.gLFyf.gsfi')

// 		await page.goForward()
// 		await page.waitForSelector('.crayons-header')

// 		await browser.close()
// 	})
// })

// describe('表單相關事件', async () => {
// 	it('input checkbox select', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 20,
// 			devtools: false,
// 		})

// 		const page = await browser.newPage()
// 		await page.goto('https://devexpress.github.io/testcafe/example/')

// 		// input
// 		await page.type('#developer-name', 'Mars', { delay: 100 })
// 		await page.waitForTimeout(500)

// 		// checkbox
// 		await page.click('#tried-test-cafe', { clickCount: 1 })
// 		await page.waitForTimeout(500)

// 		// select
// 		await page.select('#preferred-interface', 'JavaScript API')
// 		await page.waitForTimeout(500)

// 		// textarea
// 		await page.type('#comments', '1234567e9r0t8er9009')

// 		// button
// 		await page.click('#submit-button')

// 		// 確認是否有跳轉到成功訊息畫面
// 		await page.waitForSelector('.result-content')
// 	})
// })

// describe('取得 url title p', async () => {
// 	it('input checkbox select', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 20,
// 			devtools: false,
// 		})

// 		const page = await browser.newPage()
// 		await page.setDefaultTimeout(10000) // 修改預設 timeout 時間
// 		// 修改導航 timeout 時間
// 		// 此方法会改变下面几个方法的默认30秒等待时间：
// 		// page.goto(url, options)
// 		// page.goBack(options)
// 		// page.goForward(options)
// 		// page.reload(options)
// 		// page.waitForNavigation(options)
// 		await page.setDefaultNavigationTimeout(20000)

// 		await page.goto('http://example.com/')

// 		const url = await page.url()
// 選擇單個 $eval
// 		const title = await page.$eval('h1', el => el.textContent)
// 選擇多個 $$
// 		const p = await page.$$('p', el => el)

// 		expect(url).to.include('http://example.com/')
// 		expect(title).to.be.a('string', 'title Example Domain')
// 		expect(p.length).to.equal(2)

// 		await browser.close()
// 	})
// })

// describe('鍵盤事件', async () => {
// 	it('search enter', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 20,
// 			devtools: false,
// 		})

// 		const page = await browser.newPage()
// 		await page.goto('http://zero.webappsecurity.com/index.html')

// 		await page.waitForSelector('#searchTerm')
// 		await page.type('#searchTerm', 'Hello World')
// 		await page.keyboard.press('Enter', { delay: 10 })
// 		await page
// 			.waitForXPath('//img')
// 			.then(() => console.log('First URL with image: ' + currentURL))

// 		await page.waitForTimeout(5000)

// 		await browser.close()
// 	})
// })

// describe('xPath', async () => {
// 	it('search enter', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 20,
// 			devtools: false,
// 		})

// 		const page = await browser.newPage()
// 		await page.goto('https://dev.to/')
// 		await page.waitForXPath(
// 			'//a[@class="crayons-story__hidden-navigation-link"]'
// 		)

// 		// xpath 選擇多個
// 		const crayonsStoryItems = await page.$x('//div[@class="crayons-story "]')
// 		console.log('crayonsStoryItems', crayonsStoryItems.length)
// 		await browser.close()
// 	})
// })

// describe('等待元素消失', async () => {
// 	it('wait dom hide', async () => {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 20,
// 			devtools: false,
// 		})

// 		const page = await browser.newPage()
// 		await page.goto('http://zero.webappsecurity.com/index.html')

// 		await page.waitForSelector('#signin_button')
// 		await page.click('#signin_button')

// 		// 等到 signin_button 按鈕消失, 方法一
// 		// await page.waitFor(() => !document.querySelector('#signin_button'))

// 		// 等到 signin_button 按鈕消失, 方法二
// 		await page.waitForSelector('#signin_button', {
// 			hidden: true,
// 			timeout: 3000,
// 		})

// 		await browser.close()
// 	})
// })

describe('use helpers methods', async () => {
	let browser, page
	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 20,
			devtools: false,
		})
		page = await browser.newPage()
		await page.goto('http://zero.webappsecurity.com/index.html')
	})

	after(async () => {
		await browser.close()
	})

	it('use getText methods', async () => {
		const brandText = await getText(page, '.brand')
		expect(brandText).equal('Zero Bank')
	})

	it('use getCount methods', async () => {
		const count = await getCount(page, '.span3')
		expect(count).equal(4)
	})

	// it('use click methods', async () => {
	// 	await click(page, '#signin_button')
	// })

	// it('use shouldNotExist methods', async () => {
	// 	await click(page, '#signin_button')
	// 	await page.waitFor(2000)

	// 	await shouldNotExist(page, '#signin_button')
	// })

	it('use inptuValue methods', async () => {
		await inputValue(page, '#searchTerm', 'Mars', { delay: 300 })
	})

	it('use waitForText methods', async () => {
		await waitForText(page, '.brand', 'Zero Bank')
	})
})
