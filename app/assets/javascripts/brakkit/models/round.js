
//= require ./record.js

Brakkit.Round = Brakkit.Record.extend({
  rank: 0,
  bracket_id : null,
  matches : [],
  urlRoot : '/rounds',
  attributes : function(){
    var self= this;
    return { round : { rank : self.get('rank') }, bracket_id : self.get('bracket_id') };
  }.property('rank', 'bracket_id')
});
