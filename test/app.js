'use strict';
describe('ViewModel AppVM', function(){
  var mockEntries = {
    mock: 'entries',
    create: function(){},
    update: function(){}
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

  describe('editEntry', function(){
    it('should initially expose editEntry as a null-filled entry', function(){
      expect(vm.editEntry).toEqual(
        {$id: null, date: null, desc: null, hour: null});
    });

    describe('resetEditEntry(entry)', function(){
      it('if entry is not falsy, then editEntry should Equal entry', function(){
        vm.newEntry = null;
        var entry = {$id: 30, mock: 'entry'};
        vm.resetEditEntry(entry);
        expect(vm.editEntry).toEqual(entry);
      });

      it('editEntry should not be identical to entry', function(){
        vm.editEntry = {a: 1, b: 2, c: 3};
        var entry = {$id: 30, mock: 'entry'};
        vm.resetEditEntry(entry);
        expect(vm.editEntry).not.toBe(entry);
      });
    });

    describe('submitEditEntry()', function(){
      it('should update the entry, using the entries service', function(){
        vm.resetEditEntry({mock: 'entry'});
        vm.submitEditEntry();
        expect(mockEntries.update).toHaveBeenCalledWith({mock: 'entry'});
      });

      it('should reset editEntry', function(){
        vm.resetEditEntry({date: 'abc', desc: 'abc', hour: 1.1});
        vm.submitEditEntry();
        expect(vm.editEntry).toEqual(
          { $id: null, date: null, desc: null, hour: null });
      });
    });
  });

  function buildVM(){
    module('app');
    spyOn(mockEntries, 'create');
    spyOn(mockEntries, 'update');
    inject(function($controller){
      vm = $controller('AppVM', {entries: mockEntries});
    });
  }
});
