import { expect } from 'chai';
import { withMethodMissing } from '../src/main';

describe('withMethodMissing', () => {
  @withMethodMissing
  class TestClass {
    constructor() {
      this.dummyMember = true;
    }

    methodMissing(name, ...args) {
      return {name, args};
    }

    dummyMethod() {
      return true;
    }
  }

  // Catch, impossible to tell function from member

  it('should create an instance', () => {
    const testInstance = new TestClass();
    expect(testInstance).to.exist;
  });

  it('should access its own methods', () => {
    const testInstance = new TestClass();
    expect(testInstance.dummyMethod()).to.equal(true);
  });

  it('should access its own members', () => {
    const testInstance = new TestClass();
    expect(testInstance.dummyMember).to.equal(true);
  });

  it('should call method missing', () => {
    const testInstance = new TestClass();
    expect(testInstance.inexistentMethod()).to.exist;
  })

  it('should access the method name from method missing', () => {
    const testInstance = new TestClass();
    const response = testInstance.inexistentMethod();
    expect(response.name).to.equal('inexistentMethod');
  });

  it('should access the method args from method missing', () => {
    const testInstance = new TestClass();
    const response = testInstance.inexistentMethod(true);
    expect(response.args[0]).to.equal(true);
  });

  it('should access get every method args from method missing', () => {
    const testInstance = new TestClass();
    const response = testInstance.inexistentMethod(1, 2, 3, 4);
    expect(response.args.length).to.equal(4);
  });
});