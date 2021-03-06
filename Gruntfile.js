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

module.exports = function (grunt) {
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                outputStyle: 'compressed',
                sourceMap: true
            },
            minifyWebUi: {
                files: [{
                    './app/css/app-demo.min.css': ['./app/theming/app-demo.scss']
                }]
            }
        },
        systemjs: {
            options: {
                sfx: true,
                minify: false,
                sourceMaps: true,
                build: {
                    lowResSourceMaps: true
                }
            },
            bundleWebUi: {
                options: {
                    configFile: "./app/systemjs.builder.config.js"
                },
                files: [{
                    "src": "./app/app-bootstrap.js",
                    "dest": "./app/app.bundle.min.js"
                }]
            }
        },
        compress: {
            options: {
                mode: 'gzip'
            },
            webUi: {
                files: [{
                    expand: true,
                    src: ['./app/app.bundle.min.js'],
                    dest: './',
                    ext: '.bundle.min.js.gz'
                }]
            },
            webUiStyles: {
                files: [{
                    expand: true,
                    src: ['./app/css/app-demo.min.css'],
                    dest: './',
                    ext: '.min.css.gz'
                }]
            }
        }
    });
    grunt.registerTask('compile-web-ui-styles', ['sass:minifyWebUi', 'compress:webUiStyles']);
    grunt.registerTask('bundle-web-ui', ['systemjs:bundleWebUi', 'compress:webUi']);
};
