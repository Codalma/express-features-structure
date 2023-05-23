import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['json', 'lcov', 'text-summary', 'text', 'clover'],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      lines: 75,
      functions: 75,
    },
  },
  coveragePathIgnorePatterns: [
    'index.ts',
    '.config.ts',
    'multer.middleware.ts',
  ],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
