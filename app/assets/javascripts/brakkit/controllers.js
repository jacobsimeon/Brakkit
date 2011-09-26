
//= require ./brakkit-app

/* Controllers */
// Brackets
Brakkit.BracketsController = SC.ArrayProxy.create({
  content : [],
  selected : null,
  addBracket : function(_title){
    var self= this;
    var bracket = Brakkit.Bracket.create({
      title : _title,
      teams : []
    });
    this.pushObject(bracket);
    bracket.save(function(){
      self.selectBracket(bracket);
    });
  },
  loadBrackets : function(){
    var self = this;
    $.getJSON('/brackets',function(data, status, xhr){
      data.forEach(function(value){
        var bracket = Brakkit.Bracket.create(value);
        self.pushObject(bracket);
      });
      if(self.get('length') === 0){
         $('#new-bracket').show();
      } else {
        self.selectBracket(self.objectAt(0));
      }
    });    
  },
  selectBracket : function(bracket){
    //set the current bracket
    Brakkit.BracketsController.set('selected', bracket);
  }
});
Brakkit.BracketController = SC.Object.create({
  contentBinding : "Brakkit.BracketsController.selected",
  calculate : function(){
    console.log('calculate the bracket');
  }
});

//Teams
Brakkit.TeamsController = SC.ArrayProxy.create({
  content: [],
  loadTeams : function(){
    var self = this;
    var c = [];
    var bracket = Brakkit.BracketController.get('content');
    console.log(bracket);
    if(bracket){
      bracket.get('teams').forEach(function(value){
        $.getJSON('/teams/'+value, function(data){
          c.pushObject(Brakkit.Team.create(data));
        });
      });
    }
    self.set('content', c);
  }.observes("Brakkit.BracketController.content"),
  addTeam: function(_name, _seed){
    var team = Brakkit.Team.create({
      name : _name,
      seed : Brakkit.Seed.next()
    });
    this.pushObject(team);
    team.save();
  },
  reseed : function(){
    var seed = 1;
    this.content.forEach(function(value){
      value.set('seed', seed);
      value.save();
      seed = seed + 1;
    });
  },
  removeSelected: function(){
    var self = this;
    var numberToDelete = this.content.filter(function(value){
      return value.get('isSelected');
    }).forEach(function(value){
      self.removeObject(value);
      value.remove();
    });
    self.reseed();
  }
});

//Rounds
Brakkit.RoundsController = SC.ArrayProxy.create({
  loadRounds : function(){
    var self = this;
    var c = [];
    var bracket = Brakkit.BracketController.get('content');
    if(bracket){
      bracket.get('rounds').forEach(function(value){
        $.getJSON('/rounds/'+value, function(data){
          c.pushObject(Brakkit.Round.create(data));
        });
      });
    }
    self.set('content', c);
  }.observes("Brakkit.BracketController.content"),
  content : []
});
