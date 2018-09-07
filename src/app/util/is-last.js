var ngCore = require('@angular/core');

function LastDirective() {
  this.isLast = false;
  this.onLastDone = new ngCore.EventEmitter();
}

LastDirective.prototype = {
  constructor: LastDirective,

  ngOnInit() {
    if (this.isLast) {
      this.onLastDone.emit(true);
    }
  }
}

LastDirective.annotations = [
  new ngCore.Component({
    selector: 'islast',
    template: '<span></span>',
    inputs: [
      'isLast',
    ],
    outputs: [
      'onLastDone'
    ]
  })
];

module.exports = LastDirective;
