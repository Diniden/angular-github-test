# Repository Viewer

This project is a demonstration of how to use Angular 2 to develop a simple application that utilizes a RESTful api to have a dynamic SPA client.

Tech stack:
Angular, MobX, Webpack, SystemJS

This is based on the ngx-seed project with a few modifications.

I wanted a single command for full start up from the ground up that would install, build, run a server, and monitor my project for changes and repack on files changed.

Thus, I added a simple webpack configuration and a special command to accomplish this, but left the original commands in tact and operable.

I am using MobX as my observable store. I find this library reduces a lot of boilerplate and keeps a single direction of flow very easy to achieve. It also helps keep the componentry 'dumb'.

## Special Custom Dev Command

This will:
 - clean:install and build the project from the ground up
 - do an install for the project so webpack can operate
 - start up the http server (localhost:8080)
 - start up a webpack watch service so changes can be viewed in the browser very quickly without running dev:install

```bash
npm run dev:quick
```

## TODO

 - The dev:quick command does NOT support scss changes yet
 - This app is UGLY. I did not have time to dig into styling deeply
 - I ran out of time to research i18n support within the app
 - I have been an ESNEXT writer for many years. Writing pure ES5 proved challenging (mostly annoying) and since I run the code in Chrome directly, some ES6+ syntax may have snuck through. It's surprisingly hard to stop typing 'let' and 'const'.
 - Did not have any time to write many tests yet. I see it's in place to have them, but I got a little too ambitious with my features.

 ## Considerations

- dev time 15 hours (a chunk for the webpack integration)
- This is my first angular app in 2 years
- Never used many of these libraries so most of the time I was reading.
- Had to come up with some patterns of my own, with some rapid research for community ideas
- I havn't written in pure ES5 in several years.

#### Building
Developers can perform code changes and easily build this project using **npm** from the root nifi-fds directory via:

```bash
npm run clean:install
```

or to build without running unit tests run:

```bash
npm run clean:install:skipTests
```

Developers can speed up development time by skipping the re-installation of all node_modules:

```bash
npm run dev:install
```

or to skip re-installation of node_modules as well as building without running unit tests:

```bash
npm run dev:install:skipTests
```

#### Running locally
Once built you can start the application from the target directory via:

```bash
cd target
npm start
```

The ngx-seed demo application should now be availalbe at: [http://127.0.0.1:8080/](http://127.0.0.1:8080/). The port may differ if there is a conflict on 8080. See the output of the start command for the
available URLs.


