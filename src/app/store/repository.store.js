// Imports
var MobX = require('mobx');
var ngHttp = require("@angular/http");
var Types = require("./store.types.js");

/**
 * Provides a method for an array sort() that will sort repositories by string
 *
 * @param {*} isAscending Sort direction
 * @param {*} column The property name in the repos to sort by
 */
function sortByString(isAscending, column) {
  if (isAscending) {
    return function sortAsc(a, b) {
      return (a[column] || '').localeCompare(b[column]);
    }
  }

  return function sortDesc(a, b) {
    return -(a[column] || '').localeCompare(b[column]);
  }
}

/**
 * Provides a method for an array sort() that will sort repositories by number
 *
 * @param {*} isAscending Sort direction
 * @param {*} column The property name in the repos to sort by
 */
function sortByNumber(isAscending, column) {
  if (isAscending) {
    return function sortAsc(a, b) {
      return (a[column] || 0) - (b[column] || 0);
    }
  }

  return function sortDesc(a, b) {
    return (b[column] || 0) - (a[column] || 0);
  }
}

/**
 * This formats a repo property name to a readable format
 *
 * @param {*} name The property name to format
 */
function formatName(name) {
  var out = name.replace(/_([a-z])/g, function (g) { return ' ' + g[1].toUpperCase(); });
  out = out && out[0].toUpperCase() + out.slice(1);

  return out;
}

/**
 * This store object loads in and manages repository information.
 */
function Repositories(http) {
  // Dependency injections
  this.http = http;

  // Computed

  /** Indicates if new data is being loaded in */
  this.isLoading = false;
  /** All of the repositories loaded into the system */
  this.repositories = [];
  /** A selected repo for viewing details */
  this.viewRepo = null;
  /** The column which to sort the repositories */
  this.sortBy = 'name';
  /** The direction the sort column will be sorted by */
  this.sortAscending = true;
  /** Within the loaded repositories, this specifies a repo the user wished to interact with. */
  this.selectedRepositoryIndex = -1;

  /** The columns that should be displayed for every Repository */
  this.viewColumns = [
    { data: 'full_name', label: formatName('full_name') },
    { data: 'stargazers_count', label: formatName('stargazers_count') },
    { data: 'watchers_count', label: formatName('watchers_count') },
    { data: 'open_issues_count', label: formatName('open_issues_count') },
    { data: 'forks_count', label: formatName('forks_count') },
  ];

  // Simple Properties

  /** State specifically used within this store */
  this.state = {
    // Used in load more operation
    lastSearchTerm: '',
    // Used in load more operation
    lastPage: 0,
    // This is used when loading in data. If something changes the context, then buffering in data
    // will simply be ignored instead of processed
    loadingContext: 0,
  }

  /** All of the column names available for potentially viewing */
  this.columnNames = [];

  // Start up processes

  // Loop through a blank repo object so we can populate all column names available to a repo
  var emptyRepo = new Types.Repository();

  for (let key in emptyRepo) {
    if (emptyRepo.hasOwnProperty(key)) {
      this.columnNames.push({
        data: key,
        label: formatName(key)
      })
    }
  }
}

Repositories.parameters = [
  ngHttp.Http
];

Repositories.prototype = {
  constructor: Repositories,

  //#region Methods

  /**
   * Retrieves the top (downloaded) repositories for a given column
   *
   * @param {string} column The data property of the repo to check. (such as 'stargazers_count')
   */
  getTopRepos(column) {
    var emptyRepo = new Types.Repository();
    var sortMethod = sortByNumber(false, column);
    var repos = [].concat(this.repositories);
    var top = [];

    if (typeof emptyRepo[column] === 'string') {
      sortMethod = sortByString(true, column);
    }

    repos.sort(sortMethod);

    for (var i = 0; i < 5 && i < repos.length; ++i) {
      top.push(repos[i]);
    }

    return top;
  },

  //#endregion

  //#region Computed

  /**
   * Columns as a simple array
   */
  get columns() {
    return MobX.toJS(this.viewColumns);
  },

  /**
   * Retrieves the repositories based on the sort criteria in the store
   */
  get sortedRepositories() {
    // Retrieve observable values first
    var sortAscending = this.sortAscending;
    var sortBy = this.sortBy;
    var repositories = this.repositories;
    var repositoryCount = this.repositories.length;

    // Quick exit checks
    if (repositoryCount === 0) return repositories;

    var sortMethod;
    var testValue = new Types.Repository()[sortBy];

    // A test value must be defined for sorting to take place
    if (testValue === undefined || testValue === null) {
      return repositories;
    }

    // Check the test values type for the sorting method to be used
    if (typeof testValue === 'string') {
      sortMethod = sortByString(sortAscending, sortBy);
    }

    else {
      sortMethod = sortByNumber(sortAscending, sortBy);
    }

    // Apply the sorting to the repository list without mutating it
    return this.repositories.slice(0).sort(sortMethod);
  },

  /**
   * Detached list of the repository list
   */
  get list() {
    return this.repositories.slice(0);
  },

  /**
   * Gets a repo that is currently selected. If a valid repo is not selected,
   * a default repo is provided.
   */
  get selectedRepo() {
    var repo = this.repositories[this.selectedRepositoryIndex] || new Types.Repository();
    return repo;
  },

  /**
   * Gets the data for the top repos based on any view columns that are numerical data.
   * This chart data is compatible with charts such as Vertical Grouped Bars
   */
  get topReposChartData() {
    var data = [];
    // Retrieve any observable data first
    var viewColumns = this.viewColumns;
    var repositories = this.list;

    // Let's loop through the visible columns and find the columns that contain numerical
    // data
    var emptyRepo = new Types.Repository();
    var numberColumns = [];

    for (var i = 0; i < viewColumns.length; ++i) {
      var column = viewColumns[i].data;

      if (typeof emptyRepo[column] === 'number') {
        numberColumns.push(column);
      }
    }

    // Loop through the repositories and retrieve the top repos for every numerical column specified
    for (var i = 0; i < numberColumns.length; ++i) {
      var column = numberColumns[i];
      var top = this.getTopRepos(column);
      var series = [];

      for (var k = 0; k < top.length; ++k) {
        var repo = top[k];

        series.push({
          name: repo.full_name,
          value: repo[column]
        });
      }

      data.push({
        name: formatName(column),
        series: series,
      });
    }


    return data;
  },

  //#endregion

  //#region Actions

  /**
   * This action takes whatever the last search term was and loads next page of data.
   */
  loadMore() {
    this.state.lastPage = (this.state.lastPage || 0) + 1;
    this.loadRepositories(this.state.lastSearchTerm, this.state.lastPage);
  },

  /**
   * This action will load in the repositories found by the provided search term.
   *
   * @param {string} search The term to search for repositories
   * @param {number} page The page of data you wish to load
   */
  loadRepositories(search, page) {
    var self = this;
    this.state.lastSearchTerm = search;
    search = search || '*';

    // Check if there's a condition which would lead us to restart our data from scratch
    if (page === undefined || search !== this.state.lastSearchTerm) {
      this.repositories = [];
      this.state.lastPage = 0;
      this.state.loadingContext++;
      page = 0;
    }

    // Get a loading context flag so we can discard outdated search data streamed in
    var loadingContext = this.state.loadingContext;
    this.isLoading = true;

    // Perform the fetch of data from the server
    this.http
      .get(
        'https://api.github.com/search/repositories?q=' +
        search +
        '&page=' + page.toString() +
        '&per_page=20' +
        '&sort=' + this.sortBy
        , {},
        {
          headers: new ngHttp.Headers({ 'Content-Type': 'application/json'})
        }
      )
      .subscribe(function(response) {
        // Make sure our load is a valid load, otherwise we'll just throw out the results
        if (loadingContext !== self.state.loadingContext) {
          return;
        }

        var data = response.json();
        var repositories = data.items;

        // Start our transaction and broadcast out our changes to the repository
        MobX.transaction(function() {
          for (let i = 0, end = repositories.length; i < end; ++i) {
            var repo = new Types.Repository();
            repo.assignJson(repositories[i]);
            self.repositories.push(repo);
          }

          self.isLoading = false;
        });
      })
    ;
  }

  //#endregion
}

// MobX integration
MobX.decorate(Repositories, {
  // Properties
  repositories: MobX.observable,
  selectedRepositoryIndex: MobX.observable,
  sortAscending: MobX.observable,
  sortBy: MobX.observable,
  viewRepo: MobX.observable,
  viewColumns: MobX.observable,

  // Computed
  columns: MobX.computed,
  list: MobX.computed,
  selectedRepo: MobX.computed,
  sortedRepositories: MobX.computed,
  topReposChartData: MobX.computed,

  // Actions
  loadMore: MobX.action,
  loadRepositories: MobX.action,
});

module.exports = Repositories;
