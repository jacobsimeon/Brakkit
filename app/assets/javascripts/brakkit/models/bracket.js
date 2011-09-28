
//= require ./record

Brakkit.Bracket = Brakkit.Record.extend({
  title : "",
  teams : [],
  rounds : [],
  committed : false,
  urlRoot : '/brackets',
  attributes : function(){
    var self = this;
    return {
      bracket : {
        title : self.get('title')
      }
    };
  }.property('title', 'teams')
});
