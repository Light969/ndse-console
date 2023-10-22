#!/usr/bin/env node

const Game = require('./game');
const readline = require('node:readline');

// Основной рабочий вариант кода
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

// Альтернативный рабочий вариант
// const rl = readline.createInterface({input: process.stdin, output: process.stdout,});

new Game(rl).init();
