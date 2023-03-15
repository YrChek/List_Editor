function validatorFormName(formName) {
  const text = formName.value;
  if (text === '') {
    const nextEl = formName.nextElementSibling;
    nextEl.textContent = 'Заполните это поле.';
    return false;
  }
  return true;
}

function validatorFormPrice(formPrice) {
  const sum = formPrice.value;
  const nextEl = formPrice.nextElementSibling;
  if (sum === '') {
    nextEl.textContent = 'Поле не должно быть пустым';
    return false;
  }
  if (/[^0123456789.,-]/.test(sum)) {
    nextEl.textContent = 'Использование букв недопустимо';
    return false;
  }
  if (/[,]+/.test(sum)) {
    nextEl.textContent = 'В качестве разделителя используйте точку';
    return false;
  }
  if (/.*\..*\./.test(sum)) {
    nextEl.textContent = 'Добавлен лишний разделитель';
    return false;
  }
  if (/-/.test(sum)) {
    nextEl.textContent = 'Отрицательные значения недопустимы';
    return false;
  }
  if (sum === '0') {
    nextEl.textContent = 'Сумма должна быть больше нуля';
    return false;
  }
  return true;
}

export default function validator(formName, formPrice) {
  if (!validatorFormName(formName)) return false;
  if (!validatorFormPrice(formPrice)) return false;
  return true;
}
