# Express TS template with a structure by features.

## Description
Hello there ✌️
 
This project originally started as a template for my own API projects, where I wanted to implement a structure by features.

Now, I'm excited to share it with you, hoping that it may be of help like others developers inspired me. 🚀

Please keep in mind that this project is a continuous work in progress, and I'm constantly seeking ways to improve and refine it.

Your feedback and contributions are welcome and appreciated. 🙏

Thank you for considering my template.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Commands](#commands)
- [Structure](#structure)
- [Error handling](#error-handling)
- [Logging](#logging)
- [Environmental variables](#environment-variables)
- [Inspirations](#inspirations)

## Prerequisites
- Node.js (>=18.0.0),
- NPM (>=8.0.0) or Yarn (>=1.22.0)

## Features

- **Type checking**: using [TypeScript](https://www.typescriptlang.org/),
- **Testing**: with [Jest](https://jestjs.io/fr/) and [SuperTest](https://github.com/ladjs/supertest), 
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io),
- **Authentication and authorization**: using [Passport](https://www.passportjs.org/),
- **JWT**: using [JsonWebToken](https://github.com/auth0/node-jsonwebtoken#readme),
- **Security**: security HTTP headers using [Helmet](https://helmetjs.github.io) and [Express Rate Limit](https://github.com/express-rate-limit/express-rate-limit),
- **Hashing** : password hashing using [Bcrypt](https://github.com/kelektiv/node.bcrypt.js),
- **CORS**: Cross-Origin Resource-Sharing using [Cors](https://github.com/expressjs/cors),
- **Compression**: gzip compression with [Compression](https://github.com/expressjs/compression)
- **Logging**: with [Morgan](https://github.com/expressjs/morgan#readme) and [Winston](https://github.com/winstonjs/winston),
- **Files uploading**: with [Multer](https://github.com/expressjs/multer),
- **Image processing** with [Sharp](https://github.com/lovell/sharp),
- **Environment variables**: using [Dotenv](https://github.com/motdotla/dotenv) and [Cross-env](https://github.com/kentcdodds/cross-env#readme),
- **Git hooks**: with [Husky](https://github.com/typicode/husky),
- **Process management**: using [PM2](https://pm2.keymetrics.io/),
- **Dependency management**: with [Npm](https://www.npmjs.com),
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Containerization**: using [Docker](https://www.docker.com/),
- **Continuous integration**: using [CircleCi](https://circleci.com/),
- **Documentation**: with [Swagger](https://swagger.io/specification/).


## Commands
### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm run start
```

### Building

```bash
npm run build
```

### Testing

```bash
# run all tests
npm run test

# run all tests with coverage
npm run test:coverage
```

### Running with Docker

```bash
# run the app in development mode
npm run docker:dev

# run the app in production mode
npm run docker:prod

# run all tests
npm run docker:test
```

### Linting

```bash
# run ESLint
npm run lint

# run prettier
npm run prettier

# fix prettier errors
yarn prettier:fix
```

## Structure
```
src/
|-- application/      # Contains the use cases and business logic of the application
|   |-- interfaces/     # Interfaces for use cases and application services
|   |-- mappers/        # Mappers to convert data between different layers
|   |-- services/       # Application services for business logic
|   |-- useCases/       # Use cases (business scenarios)
|-- domain/           # Contains entities, interfaces, exceptions, repositories, and domain services
|   |-- entities/       # Domain entities
|   |-- exceptions/     # Domain-specific exceptions
|   |-- interfaces/     # Domain interfaces
|   |-- repositories/   # Repository interfaces (data access)
|   |-- services/       # Domain services
|-- infrastructure/   # Contains infrastructure-related code and implementations
|   |-- configs/        # Configuration files
|   |-- http/           # HTTP-related components (controllers, middleware, etc.)
|   |-- interfaces/     # Interfaces for infrastructure components
|   |-- repositories/   # Repository implementations (data access)
|   |-- services/       # Infrastructure services
|   |-- libraries/      # Third-party libraries and integrations
|   |-- utils/          # Utility functions and modules
|-- presentation/     # Contains presentation layer components
|   |-- controllers/    # API controllers
|   |-- interfaces/     # Interfaces for presentation layer components
|   |-- middlewares/    # Express middlewares
|   |-- routes/         # API routes
```

## Error Handling

The ErrorHandlerMiddleware class is responsible for handling errors and sending appropriate responses based on the type of error encountered.
```typescript
export class ErrorHandlerMiddleware implements IErrorHandlerMiddleware {
  private logger: ILoggerService;

  constructor(logger: ILoggerService) {
    this.logger = logger;
  }

  execute = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof DomainError) {
      this.logger.logError(
        `Operational error [${error.code}]: ${error.message}`
      );
      res.status(error.code).json({ error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error.' });
      this.logger.logError(`Program error [500]: ${error.message}`);
      process.exit(1);
    }
  };
}
```

### Features
    * Handles operational errors derived from DomainError instances, providing a consistent response structure with the associated error code and message.
    * Logs operational errors using the provided ILoggerService for centralized error tracking and debugging.
    * Handles other errors as program errors, sending a generic internal server error response and logging the error message.
    * Gracefully exits the process with a non-zero status code in case of program errors, indicating a fatal error condition.

### Configuration
Make sure to configure the ILoggerService implementation with the desired logging mechanism before using the error handling middleware. The ILoggerService interface should provide methods for logging various severity levels like logError, logWarn, etc.

## Logging

The Winston library is used as the logging library. The WinstonLibrary class in the infrastructure layer implements the following interface:
```typescript
export interface ILoggerService {
  logInfo(info: string): void;
  logWarn(warn: string): void;
  logError(error: string): void;
  logHttp(http: string): void;
  logDebug(debug: string): void;
}
```

This library is then injected into the LoggerService of the application layer. The logger is instantiated as follows:
```typescript
const winstonLibrary: ILoggerService = WinstonLibrary.getInstance(winstonLogger);
const logger: ILoggerService = LoggerService.getInstance(winstonLibrary);

```

The logger provides the following methods according to the following severity levels (ascending order from most important to least important):
```typescript
// Logs an error message (level 0)
logger.logError('Error message');

// Logs a warning message (level 1)
logger.logWarn('Warning message');

// Logs an informational message (level 2)
logger.logInfo('Information message');

// Logs an HTTP-related message (level 3)
logger.logHttp('HTTP-related message');

// Logs a verbose message (level 4)
logger.logVerbose('Verbose message');

// Logs a debug message (level 5)
logger.logDebug('Debug message');
```


In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\

It is up to the server (or process manager) to actually read them from the console and store them in log files.\

This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# PORTS
DEV_PORT=3000 # The port number used for development environment
TEST_PORT= 4000 # The port number used for test environment
PROD_PORT=5000 # The port number used for production environment

# RATE LIMITER
LIMIT_PERIOD=10000 # The rate limit period
LIMIT_MAX_REQUESTS=10 # The maximum requests for the rate limit period

# AUTHENTICATION AND AUTHORIZATION CONFIGURATION
TOKEN_SECRET: my_secret_key # The secret key used to sign JWT access tokens
TOKEN_EXPIRES_IN: 3600 # The expiration time in seconds for JWT access tokens
REFRESH_TOKEN_SECRET: my_refresh_token_secret # The secret key used to sign JWT refresh tokens
REFRESH_TOKEN_EXPIRES_IN: 2592000 # The expiration time in seconds for JWT refresh tokens

ACCESS_TOKEN_COOKIE_NAME=access_token # The name of the cookie that stores the JWT access token
REFRESH_TOKEN_COOKIE_NAME=refresh_token # The name of the cookie that stores the JWT refresh token
ACCESS_TOKEN_HEADER_NAME=x-access-token # The name of the header used to transmit the JWT access token
REFRESH_TOKEN_HEADER_NAME=x-refresh-token # The name of the header used to transmit the JWT refresh token
TOKEN_ISSUER=my_company_name # The name of the entity that issued the JWT token
TOKEN_AUDIENCE=my_application_name # The name of the application that the JWT token is intended for

# LIMTER OPTIONS CONFIGURATION
LIMITER_PERIOD=3600000 # The time period in milliseconds over which the maximum number of requests can be made
LIMITER_MAX_REQUESTS=100 # The maximum number of requests that can be made within the specified time period

# NODEMAILER CONFIGURATION
MAILER_HOST: smtp.example.com # The SMTP host name
MAILER_PORT: 587 # The SMTP port number
MAILER_SENDER: sender@example.com # The email address of the sender
MAILER_PASSWORD: your_password_here # The password used to authenticate the SMTP server

# DOCKER CONFIGURATION
IMAGE_NAME=image-name
CONTAINER_NAME=container-name

DEV_IMAGE_NAME=dev-image-name # The name of the Docker image used in development environment
TEST_IMAGE_NAME=test-image-name # The name of the Docker image used in test environment
PROD_IMAGE_NAME=prod-image-name # The name of the Docker image used in production environment

DEV_CONTAINER_NAME=dev-container-name # The name of the Docker container used in development environment
TEST_CONTAINER_NAME=test-container-name # The name of the Docker container used in test environment
PROD_CONTAINER_NAME=prod-container-name # The name of the Docker container used in production environment

DEV_EXPOSED_PORT=3000 # The port number that the Docker container will listen on
TEST_EXPOSED_PORT=4000 # The port number that the Docker container will listen on
PROD_EXPOSED_PORT=5000 # The port number that the Docker container will listen on
```


# Inspirations
* [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate/tree/master).