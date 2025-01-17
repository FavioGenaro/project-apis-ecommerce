// // const { pathsToModuleNameMapper } = require("ts-jest/utils"); 
// // const { compilerOptions } = require("./tsconfig.json");  
// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */ 
// module.exports = { 
//     // preset: 'ts-jest', 
//     // testEnvironment: 'node', 
//     // coveragePathIgnorePatterns: ["/node_modules/"],
//     // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
//     // moduleFileExtensions: ['ts', 'tsx', 'js'],
//     // transform: {
//     //     '^.+\\.ts$': 'ts-jest',
//     // },
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testMatch: ['**/tests/**/*.test.ts'],
//     moduleFileExtensions: ['ts', 'tsx', 'js'],
//     transform: {
//         '^.+\\.ts$': 'ts-jest',
//     },
//     setupFiles: ['./jest.setup.js'],
// };

import type {Config} from 'jest';

const config: Config = {
    setupFiles: ['./jest.setup.js'],
};

export default config;