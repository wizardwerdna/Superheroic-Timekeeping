'use strict';
describe('ViewModel AppVM', function(){
  var ConfirmMessage = 'Are you sure you want to delete this entry?';
  var mockEntries = {
    mock: 'entries',
    create: function(){},
    read: function(){},
    update: function(){},
    destroy: function(){}
  };

  var mock$window = {
    confirm: function(){}
  };

  var vm;

  beforeEach(buildVM);

  it('should expose entries', function(){
    expect(vm.entries).toBe(mockEntries);
  });

  describe('confirm()', function(){
    it('should rely on $window.confirm', function(){
      vm.confirm();
      expect(mock$window.confirm).toHaveBeenCalledWith(ConfirmMessage);
    });
    it('should return the result of the call', function(){
      mock$window.confirm.andReturn({mock: 'isConfirmed'});
      expect(mock$window.confirm()).toEqual({mock: 'isConfirmed'});
    });
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

  describe('destroy(entry)', function(){
    it('should destroy the entry', function(){
      vm.destroyEntry({mock: 'entry'});
      expect(mockEntries.destroy).toHaveBeenCalledWith({mock: 'entry'});
    });
  });

  function buildVM(){
    module('app');
    spyOn(mockEntries, 'create');
    spyOn(mockEntries, 'update');
    spyOn(mockEntries, 'destroy');
    spyOn(mock$window, 'confirm');
    inject(function($controller){
      vm = $controller('AppVM', {
        entries: mockEntries,
        $window: mock$window
      });
    });
  }
});
