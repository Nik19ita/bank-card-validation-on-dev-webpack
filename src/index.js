/* eslint-disable no-undef */
import 'babel-polyfill';
import { el, setChildren } from 'redom';
import IMask from 'imask';
const valid = require('card-validator');
const validatorEmail = require('email-validator');
const creditCardType = require('credit-card-type');
import mir from './assets/images/mir.svg';
import jcb from './assets/images/jcb.svg';
import masterCard from './assets/images/masterCard.svg';
import visa from './assets/images/visa.svg';
import './style.scss';

export function createCard(cardNumber, cardDate, cardCVV, email) {
  return el('div.card', [cardNumber, cardDate, cardCVV, email]);
}

const title = el('h1', { style: 'text-align: center;' }, 'Банк');
const cardType = el('img.card-type', { src: '' });
export const cardNumber = el('input.card-number', {
  type: 'text',
  placeholder: 'Номер карты',
});
export const cardDate = el('input.card-date', {
  type: 'text',
  placeholder: 'ММ/ГГ',
});
export const cardCVV = el('input.card-cvv', {
  type: 'number',
  placeholder: 'CVC/CVV',
  onKeyPress: 'if(this.value.length === 3) return false',
});
export const email = el('input.card-email', {
  type: 'e-mail',
  placeholder: 'Email',
});
const button = el('button.button', { disabled: 'true' }, 'ОПЛАТИТЬ');
setChildren(document.body, [
  createCard(cardNumber, cardDate, cardCVV, email),
  button,
  title,
  cardType,
]);

const validInputs = {
  cardNumber: false,
  cardDate: false,
  cardCVV: false,
  email: false,
};

function validationInputs(obj) {
  if (
    Object.values(obj).every((value) => {
      return value;
    })
  ) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'true');
  }
}

IMask(cardNumber, {
  mask: '0000 0000 0000 0000',
});

export function cardValidNumber(numberCard) {
  if (valid.number(numberCard).isValid) {
    validInputs.cardNumber = true;
    validationInputs(validInputs);
    return true;
  } else {
    validInputs.cardNumber = false;
    validationInputs(validInputs);
    return false;
  }
}

cardNumber.addEventListener('input', () => {
  if (
    cardNumber.value.split('').length === 19 &&
    creditCardType(cardNumber.value)[0]?.type
  ) {
    switch (creditCardType(cardNumber.value)[0].type) {
      case 'mir':
        cardType.src = mir;
        break;
      case 'jcb':
        cardType.src = jcb;
        break;
      case 'visa':
        cardType.src = visa;
        break;
      case 'mastercard':
        cardType.src = masterCard;
        break;
      default:
        cardType.src = '';
        break;
    }
  } else {
    cardType.src = '';
  }

  cardValidNumber(cardNumber.value);
});

// Валидация даты

IMask(cardDate, {
  mask: 'm/y',
  blocks: {
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    y: {
      mask: IMask.MaskedRange,
      from: new Date().getFullYear() - 2000,
      to: 55,
      maxLength: 2,
    },
  },
});

cardDate.addEventListener('input', () => {
  if (
    cardDate.value.split('/')[1] ===
      (new Date().getFullYear() - 2000).toString() &&
    cardDate.value.split('/')[0] < (new Date().getMonth() + 1).toString()
  ) {
    let mount = (new Date().getMonth() + 1).toString();
    if (mount < 10) mount = '0' + mount;
    const year = (new Date().getFullYear() - 2000).toString();
    cardDate.value = mount + '/' + year;
  }
  if (valid.expirationDate(cardDate.value).isValid) {
    validInputs.cardDate = true;
    validationInputs(validInputs);
  } else {
    validInputs.cardDate = false;
    validationInputs(validInputs);
  }
});

// Валидация CVV

export function cardValidCVV(cvvCard) {
  if (valid.cvv(cvvCard).isValid) {
    validInputs.cardCVV = true;
    validationInputs(validInputs);
    return true;
  } else {
    validInputs.cardCVV = false;
    validationInputs(validInputs);
    return false;
  }
}

cardCVV.addEventListener('input', () => {
  cardValidCVV(cardCVV.value);
});

// Валидация email
email.addEventListener('input', () => {
  if (validatorEmail.validate(email.value)) {
    validInputs.email = true;
    validationInputs(validInputs);
  } else {
    validInputs.email = false;
    validationInputs(validInputs);
  }
});
