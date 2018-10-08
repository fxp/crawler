const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

const phone = "#app > div > div > div > div.footprint-login > div.login-box > div.commit-form-zuji > label:nth-child(1) > input"
const getSmsCode = "#app > div > div > div > div.footprint-login > div.login-box > div.commit-form-zuji > label.label.getSms > div > button"
const smsCode = "#app > div > div > div > div.footprint-login > div.login-box > div.commit-form-zuji > label.label.getSms > input"
const login = "#app > div > div > div > div.footprint-login > div.login-box > div.commit-form-zuji > button"
const like = "#app > div > div > div > div.space-details-content-wrap > a.thumbs-up"

async function fetchPhoneNum() {
    return fetch("http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=00820592eab095bbec49924dec3207f23adfd31d&itemid=10138", {
        method: "GET"
    }).then(res => {
        return res.text()
    }).then(body => {
        if (body.startsWith("success")) {
            return body.slice("success".length + 1)
        } else {
            return new Error("System error")
        }
    })
}


async function fetchSmsCode(phoneNum) {
    return fetch("http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=00820592eab095bbec49924dec3207f23adfd31d&itemid=10138&mobile=" + phoneNum + "&release=1", {
        method: "POST"
    }).then(res => {
        return res.text()
    }).then(body => {
        if (body.startsWith("success")) {
            return body.slice("success".length + 1)
        } else {
            return new Error("System error")
        }
    })
}

async function run() {
    fetchPhoneNum()
        .then(num => {
                console.log("yo", num)
            },
            err => {
                console.error(err)
            })

    // fetchSmsCode("")
    //     .then(num => {
    //             console.log("yo", num)
    //         },
    //         err => {
    //             console.error(err)
    //         })

    // var phoneNum = await getPhoneNum()
    // console.log(phoneNum)
    //
    //
    // const browser = await puppeteer.launch({
    //     headless: false
    // });
    // const page = await browser.newPage();

    // await page.goto('https://m.duocaitou.com/activity/space101?pcode=J9rfgz');
    // await page.waitForSelector("#app > div > div > div > div.content-wrap > ul > li:nth-child(1) > span.right > a")
    // await page.click("#app > div > div > div > div.content-wrap > ul > li:nth-child(1) > span.right > a");
    //
    // await page.waitForSelector(phone)
    // await page.click(phone);


    // await page.type(phone, "13488892615");
    //
    // // await page.click(getSmsCode);
    //
    // await page.click(smsCode);
    // await page.type(smsCode, "5746");
    //
    // await page.click(login)
    // await page.waitFor(2 * 1000);
    //
    // await page.goto('https://m.duocaitou.com/activity/space101/details/16');
    // await page.waitForSelector(like)
    // await page.click(like)
    //


    // var count = 0;
    // let timerId = setInterval(function () {
    //     if (count < 3) {
    //         page.click(like)
    //     }else{
    //         clearInterval(timerId)
    //     }
    //     count++
    // }, 3000)

    // browser.close();


}

run();
