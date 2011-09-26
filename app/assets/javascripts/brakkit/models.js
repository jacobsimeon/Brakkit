
//= require ./brakkit-app

/* Models */
//base object for all models
Brakkit.Record = SC.Object.extend({
  id : null,
  isNew : function(){
    return !this.get('id');
  }.property('id').cacheable(),
  save : function(callback){
    var self = this,
        urlRoot = this.get('urlRoot'),
        url = this.get('isNew') ? urlRoot : urlRoot + '/' + this.get('id'),
        method = this.get('isNew') ? 'POST' : 'PUT',
        data = this.get('attributes');
        data._method = method;
        
    $.ajax(url, {
      type: 'POST',
      data: data, // this.get('attributes'){ bracket: this.get('attributes'), _method: method },
      dataType: 'json',
      success: function(data, response) {
        if (self.get('isNew')) { self.set('id', data.id); }
        if(callback){
          callback();
        }
     }
   });
   return self;
  },
  deleted : false,
  remove : function(){
    var self = this;
    if(!this.get('isNew')){
      var urlRoot = this.get('urlRoot'),
      url = urlRoot + '/' + this.get('id'),
      method = 'DELETE',
      data = {};
      data._method = method;

      $.ajax(url, {
        type: 'POST',
        data: data, // this.get('attributes'){ bracket: this.get('attributes'), _method: method },
        dataType: 'json',
        success: function(data, response) {
          console.log(data);
        }
      });
    }
  },
  //overide these
  urlRoot : 'record',
  attributes : {}
});

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

Brakkit.Team = Brakkit.Record.extend({
  name: "",
  seed: 0,
  isSelected: false,
  attributes : function(){
    var self = this;
    var _attributes = {
      team : {
        name : self.get('name'),
        seed : self.get('seed')
      }
    };
    console.log(_attributes);
    return _attributes;
  }.property('name', 'seed'),
  urlRoot : '/teams'
});

Brakkit.Round = SC.Object.extend({
  rank: 0,
  matches : []
});

Brakkit.Match = Brakkit.Record.extend({
  teams : [],
  winner : null,
  urlRoot : '/matches',
  attributes : function(){
    var self = this;
    return {
      match : { winner_id : self.winner }
    };
  }.property('winner')
});
