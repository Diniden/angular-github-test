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

(function (global) {
    System.config({
        baseURL: "./app/",
        paths: {
            // paths serve as alias
            'npm:': './node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'text': 'npm:systemjs-plugin-text/text.js',

            // jquery
            'jquery': 'npm:jquery/dist/jquery.min.js',

            // Angular
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/common/http/testing': 'npm:@angular/common/bundles/common-http-testing.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/flex-layout': 'npm:@angular/flex-layout/bundles/flex-layout.umd.js',
            '@angular/flex-layout/core': 'npm:@angular/flex-layout/bundles/flex-layout-core.umd.js',
            '@angular/flex-layout/extended': 'npm:@angular/flex-layout/bundles/flex-layout-extended.umd.js',
            '@angular/flex-layout/flex': 'npm:@angular/flex-layout/bundles/flex-layout-flex.umd.js',
            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
            '@angular/material/core': 'npm:@angular/material/bundles/material-core.umd.js',
            '@angular/material/card': 'npm:@angular/material/bundles/material-card.umd.js',
            '@angular/material/divider': 'npm:@angular/material/bundles/material-divider.umd.js',
            '@angular/material/progress-bar': 'npm:@angular/material/bundles/material-progress-bar.umd.js',
            '@angular/material/progress-spinner': 'npm:@angular/material/bundles/material-progress-spinner.umd.js',
            '@angular/material/chips': 'npm:@angular/material/bundles/material-chips.umd.js',
            '@angular/material/input': 'npm:@angular/material/bundles/material-input.umd.js',
            '@angular/material/icon': 'npm:@angular/material/bundles/material-icon.umd.js',
            '@angular/material/button': 'npm:@angular/material/bundles/material-button.umd.js',
            '@angular/material/checkbox': 'npm:@angular/material/bundles/material-checkbox.umd.js',
            '@angular/material/tooltip': 'npm:@angular/material/bundles/material-tooltip.umd.js',
            '@angular/material/dialog': 'npm:@angular/material/bundles/material-dialog.umd.js',
            '@angular/material/sidenav': 'npm:@angular/material/bundles/material-sidenav.umd.js',
            '@angular/material/menu': 'npm:@angular/material/bundles/material-menu.umd.js',
            '@angular/material/form-field': 'npm:@angular/material/bundles/material-form-field.umd.js',
            '@angular/material/toolbar': 'npm:@angular/material/bundles/material-toolbar.umd.js',
            '@angular/material/autocomplete': 'npm:@angular/material/bundles/material-autocomplete.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
            '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
            '@angular/cdk/accordion': 'npm:@angular/cdk/bundles/cdk-accordion.umd.js',
            '@angular/cdk/layout': 'npm:@angular/cdk/bundles/cdk-layout.umd.js',
            '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
            '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
            '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
            '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
            '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
            '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
            '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
            '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
            '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
            '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
            '@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',

            // needed to support gestures for angular material
            'hammerjs': 'npm:hammerjs/hammer.min.js',

            // Covalent
            '@covalent/core': 'npm:@covalent/core/bundles/covalent-core.umd.min.js',
            '@covalent/core/common': 'npm:@covalent/core/bundles/covalent-core-common.umd.min.js',
            '@covalent/markdown': 'npm:@covalent/markdown/bundles/covalent-markdown.umd.js',
            '@swimlane/ngx-charts': 'npm:@swimlane/ngx-charts/release/index.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'zone.js': 'npm:zone.js/dist/zone.js',
            'core-js': 'npm:core-js/client/shim.min.js',
            'superagent': 'npm:superagent/superagent.js',
            'querystring': 'npm:querystring',
            'tslib': 'npm:tslib/tslib.js',
            'mobx': 'npm:mobx/lib/mobx.umd.js',
            'mobx-angular': 'npm:mobx-angular/dist/mobx-angular.umd.js',

            'd3-format': 'npm:d3-format/dist/d3-format.js',
            'd3-shape': 'npm:d3-shape/dist/d3-shape.js',
            'd3-array': 'npm:d3-array/dist/d3-array.js',
            'd3-scale': 'npm:d3-scale/dist/d3-scale.js',
            'd3-color': 'npm:d3-color/dist/d3-color.js',
            'd3-dispatch': 'npm:d3-dispatch/dist/d3-dispatch.js',
            'd3-timer': 'npm:d3-timer/dist/d3-timer.js',
            'd3-time-format': 'npm:d3-time-format/dist/d3-time-format.js',
            'd3-interpolate': 'npm:d3-interpolate/dist/d3-interpolate.js',
            'd3-time': 'npm:d3-time/dist/d3-time.js',
            'd3-selection': 'npm:d3-selection/dist/d3-selection.js',
            'd3-drag': 'npm:d3-drag/dist/d3-drag.js',
            'd3-hierarchy': 'npm:d3-hierarchy/dist/d3-hierarchy.js',
            'd3-collection': 'npm:d3-collection/dist/d3-collection.js',
            'd3-path': 'npm:d3-path/dist/d3-path.js',
            'd3-scale': 'npm:d3-scale/dist/d3-scale.js',
            'd3-transition': 'npm:d3-transition/dist/d3-transition.js',
            'd3-force': 'npm:d3-force/dist/d3-force.js',
            'd3-brush': 'npm:d3-brush/dist/d3-brush.js',
            'd3-ease': 'npm:d3-ease/dist/d3-ease.js',
            'd3-quadtree': 'npm:d3-quadtree/dist/d3-quadtree.js',

            // App
            'app/app.module.js': 'app.module.js',
            'app/app.routes.js': 'app.routes.js',
            'app/app.js': 'app.js',
            'app/components/issues-view/issue-view.js': 'components/issues-view/issue-view.js',
            'app/components/home-view/home-view.js': 'components/home-view/home-view.js',

            // Util
            'app/util/trim-pipe.js': 'util/trim-pipe.js',
            'app/util/is-last.js': 'util/is-last.js',

            // Store
            'app/store/app.store.js': 'store/app.store.js',
            'app/store/issues.store.js': 'store/issues.store.js',
            'app/store/repository.store.js': 'store/repository.store.js',
            'app/store/store.types.js': 'store/store.types.js',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            'app/': {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            'app/systemjs-angular-loader.js': {
                loader: false
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'querystring': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
