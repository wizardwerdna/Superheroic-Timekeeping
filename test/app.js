'use strict';
describe('ViewModel AppVM', function(){
  var mockEntries = {
    mock: 'entries',
    create: function(){}
  };
  var vm;

  beforeEach(buildVM);

  it('should expose entries', function(){
    expect(vm.entries).toBe(mockEntries);
  });

  describe('newEntry', function(){
    it('should initially expose newEntry as a null-filled entry', function(){
      expect(vm.newEntry).toEqual({date: null, desc: null, hour: null});
    });

    it('resetNewEntry should fill newEntry with nulls', function(){
      expect(vm.newEntry).toEqual({date: null, desc: null, hour: null});
    });

    describe('submitNewentry()', function(){
      it('should create a new entry, using the entries service', function(){
        vm.newEntry = {mock: 'entry'};
        vm.submitNewEntry();
        expect(mockEntries.create).toHaveBeenCalledWith({mock: 'entry'});
      });
      it('should reset newEntry', function(){
        vm.newEntry = {date: 'abc', desc: 'abc', hour: 1.1};
        vm.submitNewEntry();
        expect(vm.newEntry).toEqual({ date: null, desc: null, hour: null });;
      });
    });
  });;

  function buildVM(){
    module('app');
    spyOn(mockEntries, 'create');
    inject(function($controller){
      vm = $controller('AppVM', {entries: mockEntries});
    });
  }
});
