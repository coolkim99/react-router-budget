<h1 align="center">
    <a href="https://react-router-budget-seven.vercel.app">
    <img src="./src/assets/home.png">
    <span>Budget App</span>
    </a>
</h1>

<p align="center">
  <i align="center">React.js로 만든 나만의 가계부 웹사이트</i>
</p>

<h4 align="center">
    <a href="https://reactjs.org/" target="_blank">
        <img src="https://img.shields.io/badge/react-%5E18.2.0-blue" alt="React">
    </a>
    <a href="https://reactjs.org/" target="_blank">
        <img src="https://img.shields.io/badge/react--dom-%5E18.2.0-blue" alt="React DOM">
    </a>
    <a href="https://reactrouter.com/" target="_blank">
        <img src="https://img.shields.io/badge/react--router--dom-6.8-blue" alt="React Router DOM">
    </a>
</h4>

<img src="./src/readmeImg/HomeImg.png"/>

## Introduction

`Amplication` is a robust, open-source development platform designed to revolutionize the creation of scalable and secure Node.js applications. We eliminate repetitive coding tasks and deliver production-ready infrastructure code, meticulously tailored to your specifications and adhering to industry best practices.

Our user-friendly interface fosters seamless integration of APIs, data models, databases, authentication, and authorization. Built on a flexible, plugin-based architecture, Amplication allows effortless customization of the code and offers a diverse range of integrations.

With a strong focus on collaboration, Amplication streamlines team-oriented development, making it an ideal choice for groups of all sizes, from startups to large enterprises. Our platform enables you to concentrate on your business logic, while we handle the heavy lifting.

Experience the fastest way to develop Node.js applications with Amplication.

<details open>
<summary>
 Features
</summary> <br />
    
</details>

## Usage

Budget App을 사용하기 위해서는~

<details>
<summary>
  Tutorials
</summary> <br />

- [To-do application using Amplication and Angular](https://docs.amplication.com/tutorials/angular-todos)
- [To-do application using Amplication and React](https://docs.amplication.com/tutorials/react-todos)
</details>

## Development

Alternatively, instead of using the hosted version of the product, Amplication can be run locally for code generation purposes or contributions - if so, please refer to our [contributing](#contributing_anchor) section.

<details open>
<summary>
Pre-requisites
</summary> <br />
To be able to start development on Amplication, make sure that you have the following prerequisites installed:

###

- Node.js
- Docker
- Git
</details>

<details open>
<summary>
Running Amplication
</summary> <br />

> **Note**
> It is also possible to start development with GitHub Codespaces, when navigating to `< > Code`, select `Codespaces` instead of `Local`. Click on either the `+`-sign or the `Create codespace on master`-button.

Amplication is using a monorepo architecture - powered by <a href="https://nx.dev">Nx Workspaces</a> - where multiple applications and libraries exist in a single repository. To setup a local development environment the following steps can be followed:

**BEFORE** you run the following steps make sure:

1. You have typescript installed locally on you machine `npm install -g typescript`
2. You are using a supported node version (check `engines` `node` in the [package.json](./package.json))
3. You are using a supported npm version (check `engines` `npm` in the [package.json](./package.json))
4. You have `docker` installed and running on your machine

5. Clone the repository and install dependencies:

```shell
git clone https://github.com/amplication/amplication.git && cd amplication && npm install
```

2. Run the setup script, which takes care of installing dependencies, building packages, and setting up the workspace:

```shell
npm run setup:dev
```

3. Option 1: Running the required infrastructure - view infrastructure component logs

```shell
npm run docker:dev
```

3. Option 2: Running the required infrastructure - run the infrastructure components in background

```shell
npm run docker:dev -- -d
```

4. Apply database migrations

```shell
npm run db:migrate:deploy
```

5. To start developing, run one or more of the applications available under `serve:[application]` scripts of the package.json.

```shell
# running the server component
npm run serve:server

# running the client component
npm run serve:client

# running the data-service-generator component
npm run serve:dsg

# running the git-pull-request-service component
npm run serve:git

# running the plugin-api component
npm run serve:plugins
```

> **Note**
> In order to run the Amplication client properly, both the client and server need to be started by the `npm run serve:[application]` command, as well as an additional component for development on a specific component.

The development environment should now be set up. Additional information on the different application components can be found under packages/`[application]`/README.md file. Happy hacking! 👾

</details>
