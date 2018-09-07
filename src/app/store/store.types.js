/**
 * This file contains essentially interface structures of certain data types expected from
 * the remote server. They may contain sparse convenience functions for populating the data.
 * If the application's complexity grows and needs more detailed information regarding any of these
 * structures, or if these structures are expected to be manipulated, they should be upgraded to fully
 * featured observable stores.
 */

// Property defaults
var defaultCount = -1;
var defaultNumberID = -1;
var defaultStringID = "";
var defaultURL = "No URL";
var defaultName = "No Name";
var defaultBranch = "master";
var defaultLanguage = "";

/**
 * This is merely a data object specifying the structure of a Owner's data found
 * within a repository
 */
function License() {
  this.key = "";
  this.name = defaultName;
  this.spdx_id = defaultStringID;
  this.url = defaultURL;
  this.node_id = defaultStringID;
}

License.prototype = {
  constructor: License,

  assignJson(json) {
    if (json) {
      Object.assign(this, json);
    }
  },
}

/**
 * This is merely a data object specifying the structure of a Owner's data found
 * within a repository
 */
function User() {
  this.avatar_url = defaultURL;
  this.events_url = defaultURL;
  this.followers_url = defaultURL;
  this.following_url = defaultURL;
  this.gists_url = defaultURL;
  this.gravatar_id = defaultStringID;
  this.html_url = defaultURL;
  this.id = defaultNumberID;
  this.login = "";
  this.node_id = defaultStringID;
  this.organizations_url = defaultURL;
  this.received_events_url = defaultURL;
  this.repos_url = defaultURL;
  this.site_admin = false;
  this.starred_url = defaultURL;
  this.subscriptions_url = defaultURL;
  this.type = "";
  this.url = defaultURL;
}

User.prototype = {
  constructor: User,

  assignJson(json) {
    if (json) {
      Object.assign(this, json);
    }
  },
}

/**
 * This is merely a data object specifying the structure of a Pull Request URL's data
 */
function PullRequestURLs() {
  this.url = defaultURL;
  this.html_url = defaultURL;
  this.diff_url = defaultURL;
  this.patch_url = defaultURL;
}

PullRequestURLs.prototype = {
  constructor: PullRequestURLs,

  assignJson(json) {
    if (json) {
      Object.assign(this, json);
    }
  },
}

/**
 * This is merely a data object specifying the structure of a Label's data
 */
function Label() {
  this.id = defaultNumberID;
  this.node_id = defaultStringID;
  this.url = defaultURL;
  this.name = "";
  this.color = "";
  this.default = false;
}

Label.prototype = {
  constructor: Label,

  assignJson(json) {
    if (json) {
      Object.assign(this, json);
    }
  },
}

/**
 * This is merely a data object specifying the structure of an Issue Summary's data
 */
function IssueSummary() {
  this.url = defaultURL;
  this.repository_url = defaultURL;
  this.labels_url = defaultURL;
  this.comments_url = defaultURL;
  this.events_url = defaultURL;
  this.html_url = defaultURL;
  this.id = defaultNumberID;
  this.node_id = defaultStringID;
  this.number = -1;
  this.title = "";
  this.user = new User();
  this.labels = [];
  this.state = "open";
  this.locked = false;
  this.assignee = new User();
  this.assignees = [];
  this.milestone = null;
  this.comments = -1;
  this.created_at = "";
  this.updated_at = "";
  this.closed_at = "";
  this.author_association = "";
  this.pull_request = new PullRequestURLs();
  this.body = "";
  this.score = -1;
}

IssueSummary.prototype = {
  constructor: IssueSummary,

  assignJson(data) {
    if (data) {
      var json = Object.assign({}, data);
      this.user = new User();
      this.user.assignJson(json.user);
      this.assignee = new User();
      this.assignee.assignJson(json.assignee);

      for (var i = 0; i < json.labels.length; ++i) {
        const label = new Label();
        label.assignJson(json.labels[i]);
        this.labels.push(label);
      }

      for (var i = 0; i < json.assignees.length; ++i) {
        const user = new User();
        user.assignJson(json.assignees[i]);
        this.assignees.push(user);
      }

      delete json.user;
      delete json.assignee;
      delete json.labels;
      delete json.assignees;

      Object.assign(this, json);
    }
  },
}

/**
 * This is merely a data object specifying the structure of a Repository's data.
 */
function Repository() {
  this.archive_url = defaultURL;
  this.archived = false;
  this.assignees_url = defaultURL;
  this.blobs_url = defaultURL;
  this.branches_url = defaultURL;
  this.clone_url = defaultURL;
  this.collaborators_url = defaultURL;
  this.comments_url = defaultURL;
  this.commits_url = defaultURL;
  this.compare_url = defaultURL;
  this.contents_url = defaultURL;
  this.contributors_url = defaultURL;
  this.created_at = Date.now().toString();
  this.default_branch = defaultBranch;
  this.deployments_url = defaultURL;
  this.description = "";
  this.downloads_url = defaultURL;
  this.events_url = defaultURL;
  this.fork = false;
  this.forks = defaultCount;
  this.forks_count = defaultCount;
  this.forks_url = defaultURL;
  this.full_name = defaultName;
  this.git_commits_url = defaultURL;
  this.git_refs_url = defaultURL;
  this.git_tags_url = defaultURL;
  this.git_url = defaultURL;
  this.has_downloads = false;
  this.has_issues = false;
  this.has_pages = false;
  this.has_projects = false;
  this.has_wiki = false;
  this.homepage = defaultURL;
  this.hooks_url = defaultURL;
  this.html_url = defaultURL;
  this.id = defaultNumberID;
  this.issue_comment_url = defaultURL;
  this.issue_events_url = defaultURL;
  this.issues_url = defaultURL;
  this.keys_url = defaultURL;
  this.labels_url = defaultURL;
  this.language = defaultLanguage;
  this.languages_url = defaultURL;
  this.license = new License();
  this.merges_url = defaultURL;
  this.milestones_url = defaultURL;
  this.mirror_url = defaultURL;
  this.name = defaultName;
  this.node_id = defaultStringID;
  this.notifications_url = defaultURL;
  this.open_issues = defaultCount;
  this.open_issues_count = defaultCount;
  this.owner = new User();
  this.private = false;
  this.pulls_url = defaultURL;
  this.pushed_at = Date.now().toString();
  this.releases_url = defaultURL;
  this.score = defaultCount;
  this.size = defaultCount;
  this.ssh_url = defaultURL;
  this.stargazers_count = defaultCount;
  this.stargazers_url = defaultURL;
  this.statuses_url = defaultURL;
  this.subscribers_url = defaultURL;
  this.subscription_url = defaultURL;
  this.svn_url = defaultURL;
  this.tags_url = defaultURL;
  this.teams_url = defaultURL;
  this.trees_url = defaultURL;
  this.updated_at = Date.now().toString();
  this.url = defaultURL;
  this.watchers = defaultCount;
  this.watchers_count = defaultCount;
}

Repository.prototype = {
  constructor: Repository,

  assignJson(json) {
    // Prevent mutations on the data
    var data = Object.assign({}, json);
    // Make the sub objects the data may contain
    this.owner = new User();
    this.license = new License();
    // Apply the data to the sub objects
    this.owner.assignJson(data.owner);
    this.license.assignJson(data.license);
    // Clean out the sub data before applying to this
    delete data.owner;
    delete data.license;
    // Assign the data
    Object.assign(this, data);
  },
}

module.exports = {
  License,
  PullRequestURLs,
  IssueSummary,
  User,
  Repository,
}
