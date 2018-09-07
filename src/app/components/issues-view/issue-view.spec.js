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

var App = require('app/app.js');
var AppDemo = require('app/components/home-view/home-view.js');
var AppRoutes = require('app/app.routes.js');
var RepositoryView = require('app/components/app-demo/dialogs/repository-view/repository-view.spec.js');
var ngCommon = require('@angular/common');
var ngCoreTesting = require('@angular/core/testing');
var ngMaterial = require('@angular/material');

describe('Repository View isolated unit tests', function () {
    var comp;
    var store = new Repositories(null);

    beforeEach(function () {
        comp = new RespositoryView(store);
    });

    it('should create component', function () {
        //assertions
        expect(comp).toBeDefined();
    });

    it('TODO test', function () {
        // // Spy
        // spyOn(comp.dialogRef, 'close');

        // // the function to test
        // comp.cancel();

        // //assertions
        // expect(comp.dialogRef.close).toHaveBeenCalled();
        expect(true);
    });
});
