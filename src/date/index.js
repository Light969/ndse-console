#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const now = new Date();
let isSuccess = false;

yargs(hideBin(process.argv))
  .command(
    'current',
    'Текущая дата и время',
    (yargsInner) => getOptions(yargsInner, 'boolean', 'Показать'),
    (argv) => {
      getCurrentDate(argv);
      isSuccess = true;
    },
  )
  .command(
    'add',
    'Будущая дата и время',
    (yargsInner) => getOptions(yargsInner, 'number', 'Добавить'),
    (argv) => {
      setDate(argv, 'add');
      isSuccess = true;
    },
  )
  .command(
    'sub',
    'Прошедшая дата и время',
    (yargsInner) => getOptions(yargsInner, 'number', 'Уменьшить'),
    (argv) => {
      setDate(argv, 'sub');
      isSuccess = true;
    },
  )
  .argv;

if (!isSuccess)
  console.log('Команда введена не верно. Попробуйте ещё раз.');

function getOptions(yargsInner, type, descriptionKey) {
  return yargsInner
    .option('y', {
      'alias': 'year',
      description: `${descriptionKey} год`,
      type,
    })
    .option('m', {
      'alias': 'month',
      description: `${descriptionKey} месяц`,
      type,
    })
    .option('d', {
      'alias': 'date',
      description: `${descriptionKey} день`,
      type,
    });
}

function getCurrentDate(argv = {}) {
  const {date, month, year} = argv;

  if (!date && !month && !year) console.log('Текущая дата и время в формате ISO: ', now.toISOString());
  if (date) console.log('Текущая дата: ', getDay(now));
  if (month) console.log('Текущий месяц: ', getMonth(now));
  if (year) console.log('Текущий год: ', `${now.getFullYear()}`);
}

function setDate(argv = {}, mode) {
  const {date, month, year} = argv;

  if (!date && !month && !year) {
    console.log('Команда введена не верно. Попробуйте ещё раз.');
    return;
  }

  console.log('Получим дату: ', calculateDate(now, date, month, year, mode));
}


function getDay(date) {
  try {
    const dayValue = date.getDate();

    return `${dayValue}`;
  } catch (error) {
    //
  }
}

function getMonth(date) {
  try {
    const month = date.getMonth();
    const months = {
      0: 'январь',
      1: 'февраль',
      2: 'март',
      3: 'апрель',
      4: 'май',
      5: 'июнь',
      6: 'июль',
      7: 'август',
      8: 'сентябрь',
      9: 'октябрь',
      10: 'ноябрь',
      11: 'декабрь',
    };

    return months[month];
  } catch (error) {
    //
  }
}

function calculateDate(date, d = 0, m = 0, y = 0, mode = 'add') {
  try {
    const day = date.getDate() + (mode === 'add' ? d : -d);
    const month = date.getMonth() + (mode === 'add' ? m : -m);
    const year = date.getFullYear() + (mode === 'add' ? y : -y);

    return new Date(year, month, day).toISOString();
  } catch (error) {
    //
  }
}


// команды в консоли

// date current
// date current --month
// date current --date
// date current --year
// date add -d 2
// date add --date 4
// date add -m 1
// date add --month 4
// date add -y 1
// date add --year 5
// date sub --month 1
// date sub -m 4
// date sub -d 3
// date sub --date 1
// date sub -y 1
// date sub --year 3
