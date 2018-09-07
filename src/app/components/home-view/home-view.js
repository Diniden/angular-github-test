/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ngCore = require('@angular/core');
var ngRouter = require('@angular/router');
var AppStore = require('app/store/app.store.js');
var Repositories = require('app/store/repository.store.js');

/**
 * The homepage component.
 *
 * @param AppService            The app service module.
 * @constructor
 */
function HomeView(appStore, repositories) {
    this.appStore = appStore;
    this.repositories = repositories;
    this.columnSuggestions = repositories.columnNames.slice(0);

    this.chartColorScheme = {
        domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80'],
    };

    // Clear out any suggestions that already exists in the view columns
    for (var i = 0; i < repositories.viewColumns.length; ++i) {
        this.addColumn(repositories.viewColumns[i]);
    }
};

HomeView.prototype = {
    constructor: HomeView,

    onChartSelect: function(value) {
        var repos = this.repositories.list;

        for (var i = 0; i < repos.length; ++i) {
            if (repos[i].full_name === value.name) {
                this.virtualScroll.scrollTo(i);
                break;
            }
        }
    },

    /**
     * Responds to the chip component adding columns
     */
    addColumn: function (value) {
        var i;

        for (i = 0, end = this.columnSuggestions.length; i < end; ++i) {
            if (this.columnSuggestions[i].label === value.label) {
                break;
            }
        }

        this.columnSuggestions.splice(i, 1)[0];
    },

    /**
     * Respond to the chip component removing columns
     */
    removeColumn: function (value) {
        this.columnSuggestions.push(value.label);
    },

    /**
     * Respond to a row in the repository list being clicked
     */
    onRowClicked: function(value) {
        this.repositories.selectedRepositoryIndex = this.repositories.repositories.indexOf(value);
    }
};

HomeView.annotations = [
    new ngCore.Component({
        template: require('./home-view.html!text'),
        styles: [
            '.mat-line span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 10px; }',
            '.main { height: 100% }',
            '.mat-card-header-text  { width: 100% }'
        ],
        queries : {
            virtualScroll : new ngCore.ViewChild('virtualScroll')
        }
    }),
];

HomeView.parameters = [
    AppStore,
    Repositories,
];

module.exports = HomeView;
