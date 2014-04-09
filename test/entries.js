'use strict';
describe('Factory entries', function(){
  var entries;

  beforeEach(function(){
    module('app');
    inject(function(_entries_){ entries = _entries_; });
  });

  describe('init() and read()', function(){
    it('read() should initially be an empty array', function(){
      expect(angular.isArray(entries.read())).toBeTruthy('read() should be Array');
      expect(entries.read().length).toBe(0);
    });
    describe('after init(list),', function(){
      it('should not change the container', function(){
        var original = entries.read();
        entries.init([{mock: 'entry'}]);
        expect(entries.read()).toBe(original);
      });

      it('read() should $equal list', function(){
        entries.init([{mock: 'entry'}]);
        expect(entries.read()).to$Equal([{mock: 'entry'}]);
      });

      it('read() should $equal list2, after init(list2)', function(){
        entries.init([{mock: 'entry'}]);
        entries.init([{mock: 'entry2'}]);
        expect(entries.read()).to$Equal([{mock: 'entry2'}]);
      });

      it('read() should $equal doubleton list', function(){
        entries.init([{mock: 'entry1'}, {mock: 'entry2'}]);
        expect(entries.read()).to$Equal([{mock: 'entry1'}, {mock: 'entry2'}]);
      });

      it('should append an $id to each entry', function(){
        entries.init([{mock: 'entry1'}, {mock: 'entry2'}]);
        expect(entries.read().every(function(entry){
          return '$id' in entry;
        })).toBeTruthy('must add $id to every entry in', entries.read());
      });

      it('should append a unique $id to each entry', function(){
        entries.init([{mock: 'entry1'}, {mock: 'entry2'}]);
        expect(numberUniqueIds(entries.read())).toBe(entries.read().length);
      });

    });

  });

  describe('create(entry)', function(){
    it('should add entry to the array', function(){
      var entry1 = {mock: 'entry1'},
          entry2 = {mock: 'entry2'};
      entries.create(entry1);
      expect(entries.read().some(function(entry){
        return angular.equals(entry, entry1);
      })).toBeTruthy('must add entry1');
      entries.create(entry2);
      expect(entries.read().some(function(entry){
        return angular.equals(entry, entry2);
      })).toBeTruthy('must add entry2');
    });

    it('should add an entry extended with an id', function(){
      entries.create({mock: 'entry'});
      expect('$id' in entries.read()[0]).toBeTruthy('must add $id');
    });

    it('should add a unique id', function(){
      entries.init([{mock1: 'mock1'}, {mock2: 'mock2'}]);
      entries.create({mock3: 'mock3'});
      expect(numberUniqueIds(entries.read())).toBe(entries.read().length);
    });
  });

  describe('update(entry)', function(){
    it('should update the entry in the array', function(){
      var entry = {$id: 0, mock1: 'entry1', mock2: 'entry2'};
      var edited = {$id: 0, mock1: 'new1', mock3: 'new3'};
      entries.init([entry]);
      entries.update(edited);
      expect(entries.read()[0]).toEqual(edited);
    });
  });

  describe('destroy(entry)', function(){
    it('should destroy the entry in the array', function(){
      var entry = {$id: 0, mock1: 'entry1', mock2: 'entry2'};
      entries.init([entry]);
      entries.destroy(entry);
      expect(entries.read()).toEqual([]);
    });
  });

  function numberUniqueIds(list){
    return Object.keys(
      list
      .map(function(e){ return e.$id;} )
      .reduce(function(memo, e){
        memo[e] = 1;
        return memo;
      }, {})
    ).length;
  }
});
