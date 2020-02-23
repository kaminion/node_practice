#!/usr/bin/env node
// 위에꺼 어노테이션임, 노드 실행, 글로벌 모듈로 실행 할 수 있게함

const fs = require('fs');

/** CSV가져오기 */
const csv = require('csv-parse/lib/sync');

const file = fs.readFileSync('./excel/movie.csv');
//console.log(file.toString("utf-8"));

// CSV 형식을 파싱하여 객체로 반환함
const rs = csv(file.toString("utf-8"));

// console.log(rs);

/** xlsx  */
const xlsx = require("xlsx");
const xlsxFile = xlsx.readFileSync("./excel/통합 문서1.xlsx");

const sheet = xlsxFile.Sheets.movie;
const resultXlsx = xlsx.utils.sheet_to_json(sheet); // sheet를 json으로 바꿔줌
console.log(resultXlsx);


/** axios, cheerio */
// const axios = require('axios');
// const cheerio = require('cheerio');
// const crawler = async () => {
//     let result, $, text , summary = [];

//     for(const v of resultXlsx)
//     {
//         result = await axios.get(v.link); // 링크에 직접적 요청
// axios 는 당연하게 data 부를 json으로 리턴하기 때문에 .data를 사용함
//         $ = cheerio.load(result.data); // DOM에 접근
//         text = $(".story_area .con_tx").text();
//         summary.push(text);
//     }
//     console.log(summary);

// };
// crawler();

/*** puppeteer 브라우저를 띄워서 직접 접근 axios는 API 제공 사이트가 아니면 접근이 어려울수도 있다. */
const puppeteer = require("puppeteer");
const stringify = require("csv-stringify/lib/sync"); // JSON Stringfy 대신 csv에 맞게 변환
const add_to_sheet = require('');
const crawler2 = async () => {
    // true면 브라우저 안띄움 명령은 다 먹음
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage();
    // HTTP Header 
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)" 
    + "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")

    const summary = [];
    let el = null;

    // entries는 키와 밸류를 담은 배열객체를 돌려주므로 []로 감싸서 Primitive Type로 사용해줌
    for(let [k, v] of resultXlsx.entries())
    {
        let rand = Math.floor(Math.random() * 1000);
        await page.goto(v.link);
        el = await page.$(".story_area .con_tx"); // 내부에 querySelector 가 내장된 듯

        if(el)
        {
            text = await page.evaluate(tag => tag.textContent, el);
            // CSV summary.push([v.num, v.title, v.link, text]);
            cell = 'D' + (k + 2);

        }

        await page.waitFor(rand);
    }
    console.log(summary);
    await page.close();
    await browser.close();

    // CSV 작업, 동기처리가 내장되어있음 (내부가 promise)
    // const str = stringify(summary);
    // fs.writeFileSync('./excel/result.csv', str);
    
};

crawler2();