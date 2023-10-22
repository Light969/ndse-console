typeOfMessage = {
  error: 'error',
  begin: 'begin',
  stop: 'stop',
  smaller: 'smaller',
  higher: 'higher',
};

module.exports = class Game {
  static parseNumber(line) {
    const number = parseInt(line);

    return Number.isInteger(number)
      ? number
      : null;
  }

  constructor(readlineInstance) {
    this.rl = readlineInstance;
    this.numberToGuess = null;
  }

  init() {
    this.rl.setPrompt('Введите максимальное число: ');
    this.rl.prompt();

    this.rl
      .on('line', (line) => {
        const { message, text } = this.play(line);

        switch (message) {
          case typeOfMessage.stop:
            this.rl.setPrompt(text.concat('\n'));
            this.rl.prompt();
            this.rl.close();

          case typeOfMessage.error:
          case typeOfMessage.begin:
          case typeOfMessage.smaller:
          case typeOfMessage.higher:
          default:
            this.rl.setPrompt(text.concat('\n'));
        }

        this.rl.prompt();
      })
      .on('close', () => {
        process.exit(0);
      });
  }

  play(line) {
    const number = Game.parseNumber(line);

    if (number === null) {
      return {
        message: typeOfMessage.error,
        text: 'Необходимо ввести число. Попробуйте ещё раз.',
      };
    }

    if (this.numberToGuess === null) {
      this.numberToGuess = Math.round(Math.random() * number);

      return {
        message: typeOfMessage.begin,
        text: `Попробуйте угадать число от 0 до ${number}`,
      };
    }

    if (number === this.numberToGuess) {
      return {
        message: typeOfMessage.stop,
        text: 'Поздравляем! Вы угадали!',
      };
    }

    if (number < this.numberToGuess) {
      return {
        message: typeOfMessage.smaller,
        text: 'Число больше. Попробуйте ещё раз.',
      };
    }

    if (number > this.numberToGuess) {
      return {
        message: typeOfMessage.higher,
        text: 'Число меньше. Попробуйте ещё раз.',
      };
    }
  }
}
