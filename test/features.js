'use strict';
describe('Superheroic Timekeeping', function(){
  var page, entries;
  var entry1 = {date: '2014-01-01', desc: 'Description1', hour: 1.1},
      entry2 = {date: '2014-01-02', desc: 'Description2', hour: 1.2},
      entry3 = {date: '2014-01-03', desc: 'Description3', hour: 1.3},
      entry4 = {date: '2014-01-04', desc: 'Description4', hour: 1.4};

  describe('FEATURE: Display list of timesheet entries sorted by date.',
    function(){
    it('SCENARIO: There are no timesheet entries', function(){
      GIVEN_TimesheetEntriesFrom([]);
      THEN_TimesheetEntryDisplayConformsTo([]);
    });

    it('SCENARIO: There are some timesheet entries.', function(){
      GIVEN_TimesheetEntriesFrom([entry3, entry1, entry2]);
      THEN_TimesheetEntryDisplayConformsTo([entry1, entry2, entry3]);
    });
  });

  describe('FEATURE: Create a new timesheet entry.', function(){
    it('SCENARIO: Fill out a new form and submit.', function(){
      GIVEN_TimesheetEntriesFrom([entry4, entry1, entry2]);
      WHEN_UserFillsOutFormAndClicks(entry3, '#newEntryForm', 'button');
      THEN_TimesheetEntryDisplayConformsTo([entry1, entry2, entry3, entry4]);
    });

    it('SCENARIO: Fill out a new form and cancel.', function(){
      GIVEN_TimesheetEntriesFrom([entry4, entry1, entry2]);
      WHEN_UserFillsOutFormAndClicks(entry3, '#newEntryForm', '.cancel');
      THEN_TimesheetEntryDisplayConformsTo([entry1, entry2, entry4]);
    });
  });

  describe('FEATURE: Update an existing timesheet entry.', function(){
    it('SCENARIO: Fill out a new form and submit.', function(){
      GIVEN_TimesheetEntriesFrom([entry1, entry2, entry3]);
      var editEntry = angular.extend({}, entry4, {$id: entries.read()[1].$id});
      WHEN_UserClicksEditButtonFor(editEntry);
      WHEN_UserFillsOutFormAndClicks(editEntry, '#editEntryForm', 'button');
      THEN_TimesheetEntryDisplayConformsTo([entry1, entry3, entry4]);
    });

    it('SCENARIO: Fill out a new form and cancel.', function(){
      GIVEN_TimesheetEntriesFrom([entry4, entry1, entry2]);
      var editEntry = angular.extend({}, entry4, {$id: entries.read()[1].$id});
      WHEN_UserClicksEditButtonFor(editEntry);
      WHEN_UserFillsOutFormAndClicks(editEntry, '#editEntryForm', '.cancel');
      THEN_TimesheetEntryDisplayConformsTo([entry1, entry2, entry4]);
    });
  });

  //TODOS
  describe('FEATURE: Destroy an existing timesheet entry.', function(){ });

  function GIVEN_TimesheetEntriesFrom(list){
    module('app', 'index.html');
    inject(function(_entries_){ entries = _entries_; });
    entries.init(list);
    inject(function($compile, $rootScope, $templateCache){
      page = $compile($templateCache.get('index.html'))($rootScope);
      $rootScope.$digest();
    });
  }

  function WHEN_UserClicksEditButtonFor(entry){
    expect(page.find('.editEntry'+entry.$id).length).toBe(1);
    page.find('.editEntry'+entry.$id).click();
  }

  function WHEN_UserFillsOutFormAndClicks(entry, formId, button){
    var form = page.find(formId);
    form.find('input.date[type=date]').$type(entry.date);
    form.find('textarea.desc').$type(entry.desc);
    form.find('input.hour[type=number][step="0.1"]').$type(entry.hour);
    form.find(button).click();
  }

  function THEN_TimesheetEntryDisplayConformsTo(list){
    expect(page.find('.no-entries-msg').text().length!==0)
      .toBe(list.length===0, 'no-entry-msg only when zero', list.length);

    expect(page.find('.entry').get().map(function(entry){
      entry = $(entry);
      return {
        date: entry.find('.date').text(),
        desc: entry.find('.desc').text(),
        hour: parseFloat(entry.find('.hour').text())
      };
    })).to$Equal(list);
  }

});
