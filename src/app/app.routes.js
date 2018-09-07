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

var ngRouter = require('@angular/router');
var HomeView = require('app/components/home-view/home-view.js');
var IssueView = require('app/components/issues-view/issue-view.js');

var AppRoutes = new ngRouter.RouterModule.forRoot([
    {
        path: 'issues',
        component: IssueView,
        data: { title: 'Issues' }
    },
    {
        path: 'home',
        component: HomeView
    },
    {
        path: '**',
        component: HomeView
    },
]);

module.exports = AppRoutes;
