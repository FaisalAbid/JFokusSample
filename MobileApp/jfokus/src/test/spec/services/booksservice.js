'use strict';

describe('Service: Booksservice', function () {

  // load the service's module
  beforeEach(module('jfokusApp'));

  // instantiate service
  var Booksservice;
  beforeEach(inject(function (_Booksservice_) {
    Booksservice = _Booksservice_;
  }));

  it('should do something', function () {
    expect(!!Booksservice).toBe(true);
  });

});
