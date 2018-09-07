var MobX = require('mobx');
var ngHttp = require("@angular/http");
var Types = require("./store.types.js");

/**
 * This store loads and manages the data for issues for a single repository.
 */
function Issues(http) {
  // DI properties
  this.http = http;

  // Observables

  this.summaries = [];
  this.isLoading = false;

  // Simple properties

  this.state = {
    repository: new Types.Repository(),
    loadContext: 0,
    page: 0,
  }
}

Issues.prototype = {
  constructor: Issues,

  //#region Computed

  /**
   * Get a simple detached list of the issues
   */
  get list() {
    return this.summaries.slice(0);
  },

  //#endregion


  //#region Actions

  /**
   * Loads issues for the provided Repository object
   *
   * @param {Repository} repository
   */
  loadIssues(repository, page) {
    console.log('LOADING', repository, page);
    var self = this;

    if (page === undefined || repository !== this.state.repository) {
      this.summaries = [];
      this.state.loadContext++;
      this.state.repository = repository;
      this.state.page = 0;
      page = 0;
    }

    // Get a loading context so we can reject outdated load calls that complete
    var loadingContext = this.state.loadingContext;
    this.isLoading = true;

    this.http
      .get(
        'https://api.github.com/search/issues?q=repo:' +
        repository.full_name +
        '&page=' + page.toString() +
        '&per_page=20'
        , {},
        {
          headers: new ngHttp.Headers({ 'Content-Type': 'application/json'})
        }
      )
      .subscribe(function(response) {
        console.log('LOADED');
        // Make sure our load is a valid load, otherwise we'll just throw out the results
        if (loadingContext !== self.state.loadingContext) {
          return;
        }

        var data = response.json();
        var issueSummaries = data.items;

        // Start our transaction and broadcast out our changes to the repository
        MobX.transaction(function() {
          for (var i = 0, end = issueSummaries.length; i < end; ++i) {
            var issueSummary = new Types.IssueSummary();
            issueSummary.assignJson(issueSummaries[i]);
            self.summaries.push(issueSummary);
          }

          self.isLoading = false;
        });

        console.log('PROCESSED', )
      })
    ;
  },

  /**
   * Loads additional issues from the server.
   */
  loadMore() {
    this.state.page = (this.state.page || 0) + 1;
    this.loadIssues(this.state.repository, this.state.page);
  },

  //#endregion
}

Issues.parameters = [
  ngHttp.Http
];

// Make the store a MobX observable
MobX.decorate(Issues, {
  // Observables
  summaries: MobX.observable,
  isLoading: MobX.observable,

  // Computed
  list: MobX.computed,

  // Actions
  loadIssues: MobX.action,
});

module.exports = Issues;
