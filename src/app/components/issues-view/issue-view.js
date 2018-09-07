var ngCore = require('@angular/core');
var Issues = require('app/store/issues.store.js');
var Repositories = require('app/store/repository.store.js');

/**
 * Makes the view that displays issues for the currently selected Repository
 *
 * @param issues Issues store
 * @param issues Repository store
 * @constructor
 */
function IssueView(issues, repositories) {
    this.issues = issues;
    this.repositories = repositories;
};

IssueView.prototype = {
    constructor: IssueView,

    ngAfterViewInit() {
        this.issues.loadIssues(this.repositories.selectedRepo);
    }
};

IssueView.annotations = [
    new ngCore.Component({
        template: require('./issue-view.html!text'),
        styles: [
            '.main .mat-nav-list .mat-list-item { height: 200px; }',
            '.main .mat-nav-list .mat-list-item.header-item { height: 44px; }',
            '.list-item-contents { padding: 10px; }',
            '.summary { height: 200px; white-space: normal; }',
            '.summary-contents { margin: 10px; overflow: auto; }'
        ]
    })
];

IssueView.parameters = [
    Issues,
    Repositories,
];

module.exports = IssueView;
