
//= require ./record

Brakkit.Team = Brakkit.Record.extend({
  name: "",
  seed: 0,
  bracket_id: null,
  isSelected: false,
  attributes : function(){
    var self = this;
    var _attributes = {
      team : {
        name : self.get('name'),
        seed : self.get('seed')
      },
      bracket_id : self.get('bracket_id')
    };
    return _attributes;
  }.property('name', 'seed'),
  urlRoot : '/teams'
});
Brakkit.Team.anonymous = Brakkit.Team.create({ name : "?", seed : "?" });
