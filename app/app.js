'use strict';
angular.module('app', [])

.controller('AppVM', function(entries){
  this.entries = entries;

  this.submitNewEntry = function(){
    entries.create(angular.copy(this.newEntry));
    this.resetNewEntry();
  };

  this.resetNewEntry = function(){
    this.newEntry = {date: null, desc: null, hour: null};
  };

  this.resetNewEntry();

})

.factory('entries', function(){
  var list = [],
      nextId = 0;

  function addWithUniqueId(entry){
    list.push(angular.extend({}, entry, {$id: nextId++}));
  }

  return {
    init: function(entries){
      list.splice(0);
      entries.forEach(addWithUniqueId);
    },
    create: function(entry){
      addWithUniqueId(entry);
    },
    read: function(){ return list; },
  };
});
