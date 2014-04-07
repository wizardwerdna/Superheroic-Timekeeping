'use strict';
describe('ViewModel AppVM', function(){
  var mockEntries = {mock: 'entries'};
  var vm = {};

  beforeEach(buildVM);

  it('should expose entries', function(){
    expect(vm.entries).toBe(mockEntries);
  });

  function buildVM(){
    module('app');
    inject(function($controller){
      vm = $controller('AppVM', {entries: mockEntries});
    });
  }
});
