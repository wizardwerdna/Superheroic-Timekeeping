'use strict';
describe('Superheroic Timekeeping', function(){
  var page, entries;
  var entry1 = {date: '2014-01-01', desc: 'Description1', hour: 1.1};
  var entry2 = {date: '2014-01-02', desc: 'Description2', hour: 1.2};

  describe('FEATURE: Display list of timesheet entries.', function(){
    it('SCENARIO: There are no timesheet entries', function(){
      GIVEN_TimesheetEntriesFrom([]);
      THEN_TimesheetEntryDisplayConformsTo([]);
    });

    it('SCENARIO: There are some timesheet entries.', function(){
      GIVEN_TimesheetEntriesFrom([entry1, entry2]);
      THEN_TimesheetEntryDisplayConformsTo([entry1, entry2]);
    });
  });

  function GIVEN_TimesheetEntriesFrom(entries){
    module('app', 'index.html');
    inject(function(_entries_){
      entries.forEach(function(entry){
        _entries_.push(entry);
      }) ;
    });
    inject(function($compile, $rootScope, $templateCache){
      page = $compile($templateCache.get('index.html'))($rootScope);
      $rootScope.$digest();
    });
  }

  function THEN_TimesheetEntryDisplayConformsTo(entries){
    expect(page.find('.no-entries-msg').text().length!==0)
      .toBe(entries.length===0);

    expect(page.find('.entry').get().map(function(entry){
      entry = $(entry);
      return {
        date: entry.find('.date').text(),
        desc: entry.find('.desc').text(),
        hour: parseFloat(entry.find('.hour').text())
      };
    })).toEqual(entries);
  }
});
