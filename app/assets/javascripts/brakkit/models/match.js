
//= require ./record

Brakkit.Match = Brakkit.Record.extend({
  teams : [ Brakkit.Team.anonymous, Brakkit.Team.anonymous ],
  winner : null,
  urlRoot : '/matches',
  attributes : function(){
    var self = this;
    return {
      match : { winner_id : self.winner }
    };
  }.property('winner')
});