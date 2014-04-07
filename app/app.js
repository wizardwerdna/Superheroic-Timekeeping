'use strict';
angular.module('app', [])

.controller('AppVM', function(entries){
  this.entries = entries;
})

.value('entries', []);
