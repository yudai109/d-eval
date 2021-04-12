// const { lastIndexOf } = require('core-js/core/array')
const puppeteer = require('puppeteer')
const DCL = {waitUntil: 'domcontentloaded'}



async function getSkpData() {

    // 結果終わるまで待つ

    var LOGIN_USER = 'spcc'
    var LOGIN_PASS = 'spcc'
    var URL = 'https://area31.smp.ne.jp/area/servlet/area.MyPageBundle?detect=%94%BB%92%E8&_sort_0_10040=f011495983_up&MyPageID=883e9a3c_mgra0pdtal1m2mcsbl1&_limit_10040=100&_sort_length=3&_sort_1_10040=id_up&10714_10869296_1=2021%94N4%8C%8E&10714_10869296_2=&10714_10869297_1=&10714_10869297_2=&10714_10869299_1=&10714_11495983_1=%8A%D6%90%BC&10714_11495984_1=&10714_10869300_1=%83h%83R%83%82%83V%83%87%83b%83v&smp_sf_button_10714=%8C%9F%8D%F5'
    const TARGET_URL = "https://area31.smp.ne.jp/area/servlet/area.MyPageBundle?_sort_1_10040=id_up&_sort_0_10040=f011495983_up&10714_10869296_1=2021%94N4%8C%8E&10714_10869296_2=&10714_10869300_1=%83h%83R%83%82%83V%83%87%83b%83v&MyPageID=883e9a3c_mgra0pdtal1m2mcsbl1&10714_11495984_1=&10714_11495983_1=%8A%D6%90%BC&_limit_10040=100&10714_10869299_1=&10714_10869297_2=&detect=%94%BB%92%E8&10714_10869297_1=&_sort_length=3&smp_sf_button_10714=%8C%9F%8D%F5"
    const LOGIN_USER_SELECTOR = 'input[name=SMPID]';
    const LOGIN_PASS_SELECTOR = 'input[name=SMPPASSWORD]';
    const LOGIN_SUBMIT_SELECTOR = 'input[type=submit]';
    
    // 検索条件
    var S_DATE = "2021年4月"
    var S_AREA = "関西"
    var S_SHOP = "ドコモショップ"
    const TOUROKU_DATE = 'input[name="10714_10869296_1"]';
    const AREA = 'input[name="10714_11495983_1"]';
    const SHOP_TYPE = 'input[name="10714_10869300_1"]';
    const SEARCH_BTN = 'input[name="smp_sf_button_10714"]';
    

    const browser  = await puppeteer.launch({
        headless: false,
        // args: [
        //     '--no-sandbox',
        //     '--disabele-dev-shm-usage',
        // ]
    })

    const page = await browser.newPage()
    
    await page.goto(URL, DCL)

    // ログイン
    await page.type(LOGIN_USER_SELECTOR, LOGIN_USER); // ユーザー名入力
    await page.type(LOGIN_PASS_SELECTOR, LOGIN_PASS); // パスワード入力
    await Promise.all([ 
        // ログインボタンクリック
        // クリック後ページ遷移後通信が完了するまで待つ (ページによっては 'domcontentloaded' 等でも可)
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(LOGIN_SUBMIT_SELECTOR),
    ]);
    
    // ログイン後の画面に移動
    await page.goto(TARGET_URL);
    
    
    // input-初期値の初期化
    await page.$eval(AREA, el => el.value = '')
    await page.$eval(TOUROKU_DATE, el => el.value = '')
    await page.$eval(SHOP_TYPE, el => el.value = '')
    
    // 検索情報入力
    await page.type(TOUROKU_DATE, S_DATE); // エリア入力
    await page.type(AREA, S_AREA); // エリア入力
    await page.type(SHOP_TYPE, S_SHOP); // ショップ名入力
    await Promise.all([ 
        // 検索クリック
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(SEARCH_BTN),
    ]);

    
    
    var urls = await page.evaluate(() => {
        var pagecount = document.querySelectorAll('.smp-page')
        console.log(pagecount.length)
        // 検索URLリスト
        var url_head = "https://area31.smp.ne.jp/area/servlet/area.MyPageBundle"
        var urlList = []

        if(pagecount.length > 1) {
            // URLのリスト取得
            var url_body = pagecount[1].innerHTML.substring(10, pagecount[1].innerHTML.lastIndexOf('='))
            for(var i=1; i <= pagecount.length; i++) {
                // urlList.push(`${url_body}=${i}`)
                var _url = `${url_head}${url_body}=${i}`;
                var p_url = _url.replace(/amp;/g, '').replace('%22','');
                urlList.push(p_url);
            }
        }
        console.log(urlList);
        return urlList;
    })


    // await page.close()

    // const browser2 = await puppeteer.launch({
    //         headless: false,
    //     }
    // )
    var result = [];

    for (const url of urls){
        const page2 = await browser.newPage()
        await page2.goto(url, DCL)

        // テーブルを二次元配列でスクレイピング
        var _result = await page2.evaluate(() => {
            const rows = document.querySelectorAll('#smp-table-10040 > tbody tr');
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => {
                    if(column.innerHTML.match('<a target=')) {
                        
                        return column.innerHTML.match(/(\d+)年(\d+)月(\d+)日/g)[0]
                    } else {
                        return column.innerHTML
                    }
                });
            });
        });

        // ムダ行削除
        _result.shift()
        _result.shift()
        _result.shift()
        _result.pop()
        _result.pop()
        _result.pop()

        result.push(_result)
        await page2.close()
    }

    var join_result = result.flat()

    return join_result
}



module.exports = {
    getSkpData
}