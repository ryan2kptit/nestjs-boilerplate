# Nestjs Boilerplate with MongoDB

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

![Alt text](database.png "database design")

## Requirements

- [Docker >= 20](https://docs.docker.com/install)
- [Node >= 18.12.1](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ cp .env.example .env

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Config [Unit Test Report](https://stackoverflow.com/questions/24825860/how-to-get-the-code-coverage-report-using-jest) to HTML in package.json

```bash
"jest": {
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
}
```

## Stay in touch

- Author - [Ryan](https://github.com/ryan2kptit)

## License

Nest is [MIT licensed](LICENSE).
