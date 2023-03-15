/**
 * @jest-environment jsdom
 */

import validator from '../validator';

document.body.innerHTML = `
<div class="popup" data-id="new">
  <div class="popup-forms">
    <form>
      <div class="form-row">
        <span class="hint">Название</span>
        <input type="text" class="form form-name">
        <div class="error-name"></div>
      </div>
      <div class="form-row">
        <span class="hint">Стоимость</span>
        <input type="text" class="form form-price">
        <div class="error-price"></div>
      </div>
      <div class="buttons">
        <button class="btn save">Сохранить</button>
        <button type="reset" class="btn reset">Отмена</button>
      </div>
    </form>
  </div>
</div>
`;

const formName = document.querySelector('.form-name');
const formPrice = document.querySelector('.form-price');
const errorName = document.querySelector('.error-name');
const errorPrice = document.querySelector('.error-price');

test('Тест на вывод текста ошибки при пустом поле ввода названия', () => {
  formName.value = '';
  formPrice.value = '';
  errorName.textContent = '';
  validator(formName, formPrice);
  const result = errorName.textContent;
  expect(result).not.toBe('');
});

test('Тест на отсутствие текста ошибки при вводе валидного названия', () => {
  formName.value = 'Text';
  formPrice.value = '';
  errorName.textContent = '';
  validator(formName, formPrice);
  const result = errorName.textContent;
  expect(result).toBe('');
});

test('Тест на отсутствие текста ошибки при вводе целого числа цены', () => {
  formName.value = 'Text';
  formPrice.value = '455';
  errorPrice.textContent = '';
  validator(formName, formPrice);
  const result = errorPrice.textContent;
  expect(result).toBe('');
});

test('Тест на отсутствие текста ошибки при вводе цены с разделителем', () => {
  formName.value = 'Text';
  formPrice.value = '455.5';
  errorPrice.textContent = '';
  validator(formName, formPrice);
  const result = errorPrice.textContent;
  expect(result).toBe('');
});

test.each([
  ['Тест на вывод текста ошибки при пустом поле ввода цены', 'Text', '', ''],
  ['Тест на вывод текста ошибки при вводе букв в поле цены', 'Text', '456t', ''],
  ['Тест на вывод текста ошибки при использование запятой в качестве разделителя', 'Text', '456,5', ''],
  ['Тест на вывод текста ошибки при лишнем разделители при вводе цены', 'Text', '.456.5', ''],
  ['Тест на вывод текста ошибки при вводе отрицательного числа цены', 'Text', '-456', ''],
  ['Тест на вывод текста ошибки при вводе нулевой цены', 'Text', '0', ''],
])('"%s"', (_, textName, price, expected) => {
  formName.value = textName;
  formPrice.value = price;
  errorPrice.textContent = '';
  validator(formName, formPrice);
  const result = errorPrice.textContent;
  expect(result).not.toBe(expected);
});

test.each([
  ['Тест статуса false функции при пустом поле ввода названия', '', '456'],
  ['Тест статуса false функции при пустом поле ввода цены', 'Text', ''],
  ['Тест статуса false функции при вводе букв в поле цены', 'Text', '456t'],
  ['Тест статуса false функции при использование запятой в качестве разделителя', 'Text', '456,5'],
  ['Тест статуса false функции при лишнем разделители при вводе цены', 'Text', '.456.5'],
  ['Тест статуса false функции при вводе отрицательного числа цены', 'Text', '-456'],
  ['Тест статуса false функции при вводе нулевой цены', 'Text', '0'],
])('"%s"', (_, textName, price) => {
  formName.value = textName;
  formPrice.value = price;
  const result = validator(formName, formPrice);
  expect(result).toBeFalsy();
});

test('тест статуса true функции при валидных данных', () => {
  formName.value = 'Text';
  formPrice.value = '159';
  const result = validator(formName, formPrice);
  expect(result).toBeTruthy();
});
