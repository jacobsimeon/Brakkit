
//= require ./record
//= require ./team

Brakkit.Match = Brakkit.Record.extend({
  teams : null,
  winner : null,
  round_id : null,
  urlRoot : '/matches',
  attributes : function(){
    var self = this,
        team_ids = self.get('teams').map(function(t){
          if(t.get('id')){
            return t.get('id');
          } else {
            return 0;
          }
        });
    var winner_id = self.winner.get('id') ? self.winner.get('id') : null;
    var _attributes = {
      match : { winner_id : winner_id },
      round_id : self.get('round_id'),
      teams : team_ids
    }
    return _attributes;
  }.property('winner','teams')
});