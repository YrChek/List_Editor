// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(10000);
const url = 'http://localhost:8080';

describe('Редактор списка', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  test('проверка открытия формы ввода при нажатии на плюс', async () => {
    await page.goto(url);
    const plus = await page.$('.titleBoxing-icon');
    await plus.click();
    const forms = await page.$('.popup');
    expect(forms).toBeTruthy();
  });

  test('проверка закрытия формы ввода при нажатии кнопку отмена', async () => {
    const btnReset = await page.$('.reset');
    await btnReset.click();
  });

  test('проверка на добавление записи', async () => {
    const plus = await page.$('.titleBoxing-icon');
    await plus.click();
    const formName = await page.$('.form-name');
    const formPrice = await page.$('.form-price');
    const btnSave = await page.$('.save');
    await formName.type('Text');
    await formPrice.type('123');
    await btnSave.click();
    const note = await page.$('.note');
    expect(note).toBeTruthy();
  });

  test('проверка на изменение записи названия', async () => {
    const change = await page.$('.note-icon-edit');
    await change.click();
    await page.type('.form-name', 'Text');
    const btnSave = await page.$('.save');
    await btnSave.click();
    const container = await page.$('.note');
    const text = await container.$eval('.name', (el) => el.textContent);
    expect(text).toBe('TextText');
  });

  test('проверка на изменение суммы продукта', async () => {
    const change = await page.$('.note-icon-edit');
    await change.click();
    await page.type('.form-price', '45');
    const btnSave = await page.$('.save');
    await btnSave.click();
    const container = await page.$('.note');
    const text = await container.$eval('.price', (el) => el.textContent);
    expect(text).toBe('12345');
  });

  test('проверка на удаление записи', async () => {
    const change = await page.$('.note-icon-del');
    await change.click();
    await page.waitForTimeout(1000);
    const note = await page.$('.note');
    expect(note).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
