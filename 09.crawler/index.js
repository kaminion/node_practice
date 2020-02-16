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
const resultXlsx = xlsx.utils.sheet_to_json(sheet);
// console.log(resultXlsx);


/** axios, cheerio */
const axios = require('axios');
const cheerio = require('cheerio');
const crawler = async () => {
    let result, $, text , summary = [];

    for(const v of resultXlsx)
    {
        result = await axios.get(v.link);
    
        $ = cheerio.load(result.data);
        text = $(".story_area .con_tx").text();
        summary.push(text);
    }
    console.log(summary);

};
// crawler();

/*** puppeteer 브라우저를 띄워서 직접 접근 axios는 API 제공 사이트가 아니면 접근이 어려울수도 있다. */
const puppeteer = require("puppeteer");
const crawler2 = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(resultXlsx[0].link);
    await page.waitFor(2000);
    await page.goto(resultXlsx[1].link);
    await page.waitFor(3000);
    await page.close();
    await browser.close();
};

crawler2();