'use strict';
angular.module('app', [])

.controller('AppVM', function(entries){
  var vm = this;

  vm.entries = entries;

  vm.resetNewEntry = function(){
    vm.newEntry = {date: null, desc: null, hour: null};
  };

  vm.resetNewEntry();

  vm.submitNewEntry = function(){
    entries.create(angular.copy(vm.newEntry));
    vm.resetNewEntry();
  };

  vm.resetEditEntry = function(entry){
    vm.editEntry = angular.copy(entry);
  };

  var EMPTY_EDIT_ENTRY = {$id: null, date: null, desc: null, hour: null};
  vm.resetEditEntry(EMPTY_EDIT_ENTRY);

  vm.submitEditEntry = function(){
    entries.update(vm.editEntry);
    vm.resetEditEntry(EMPTY_EDIT_ENTRY);
  };
})

.factory('entries', function(){
  var list = [],
      nextId = 0;

  function addWithUniqueId(entry){
    list.push(angular.extend({}, entry, {$id: nextId++}));
  }

  function readById(id){
    var entry;
    for (var i=0; i<list.length; i++){
      entry = list[i];
      if (entry.$id === id){
        return entry;
      }
    }
  }

  function clearObject(o){
    Object.keys(o).forEach(function(key){
      delete o[key];
    });
  }

  function updateFrom(item, content){
    clearObject(item);
    angular.extend(item, content);
  }

  return {
    init: function(entries){
      list.splice(0);
      entries.forEach(this.create);
    },
    create: function(entry){
      addWithUniqueId(entry);
    },
    read: function(){
      return list;
    },
    update: function(entry){
      updateFrom(readById(entry.$id), entry);
    }
  };
});
