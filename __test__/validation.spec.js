import {
  cardValidNumber,
  cardValidCVV,
  createCard,
  cardNumber,
  cardDate,
  cardCVV,
  email,
} from '../src';

test('Проверка номера карты', () => {
  expect(cardValidNumber('2202206735595840')).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку', () => {
  expect(cardValidNumber('220220673559584a')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(cardValidNumber('220220673559584')).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр', () => {
  expect(cardValidNumber('22022067355958412121212')).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(cardValidCVV('111')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(cardValidCVV('1')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
  expect(cardValidCVV('1111')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания)', () => {
  expect(cardValidCVV('asf')).toBe(false);
});

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email', () => {
  const elements =
    '<div class="card"><input class="card-number" type="text" placeholder="Номер карты"><input class="card-date" type="text" placeholder="ММ/ГГ"><input class="card-cvv" type="number" placeholder="CVC/CVV" onkeypress="if(this.value.length === 3) return false"><input class="card-email" type="e-mail" placeholder="Email"></div>';
  const card = createCard(cardNumber, cardDate, cardCVV, email);
  expect(card.outerHTML).toBe(elements);
});
