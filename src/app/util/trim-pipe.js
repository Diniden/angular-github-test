var ngCore = require('@angular/core');

/**
 * Whitespace trimming pipe
 */
function TrimPipe() {

};

TrimPipe.prototype = {
    constructor: TrimPipe,

    transform(input) {
      if (typeof input === 'string') {
        return input.trim();
      }

      return input;
    }
};

TrimPipe.annotations = [
    new ngCore.Pipe({
        name: "trimWhitespace"
    })
];

module.exports = TrimPipe;
