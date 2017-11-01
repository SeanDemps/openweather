const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
require('babel-polyfill');
Enzyme.configure({ adapter: new Adapter() });