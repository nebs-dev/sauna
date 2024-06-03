## Tools
The Tools included are:

- [ts-node](https://github.com/TypeStrong/ts-node)
- [typescript](https://github.com/Microsoft/TypeScript)
- [mocha](https://mochajs.org/)
- [chai](http://chaijs.com/)
- [sinon](http://sinonjs.org/)
- [sinon-chai](https://github.com/domenic/sinon-chai)

## How to run
Simply type `npm run test` and all tests will be run.

## Configuration
All Mocha Configuration is handled via the [mocha.opts](./mocha.opts) File, this includes:
- **Compiler-Options:** Tests are ran with *ts-node* directly to skip a compilation phase
- **Test-Filter-Patterns:** All files ending with `spec.ts` will be included in tests
- **Globals and Plugin registration**: plugins (e.g. sinon-chai) can be registered within the [mocha-globals.js](./test/mocha-globals.js) File
