
//= require ./brakkit-app

/* Controllers */
// Brackets

Brakkit.Seeder = {
  next : function(){
    return Brakkit.TeamsController.get('content').get('length') + 1;
  }
}
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
  eliminate : function(from){
    //find the number of teams that need to be eliminated
    //if the number of teams is already a power of two, eliminate half of the teams
    var target = Power.of(2).lessThan(from);
    return from === target ? from / 2 : from - target;
  },
  totalRounds: function(firstElim, numberOfTeams){
    //total rounds is equal to the exponent of 2 which yeilds the number of teams
    //add in a first elimination round if the number of teams is not a power of two
    var firstRound = firstElim > 0 ? 1 : 0;
    numberOfTeams -= firstElim;
    return Root(2).of(numberOfTeams) + firstRound;
  },  
  createRounds: function(bracket){
    var self = this,
        teams = Brakkit.TeamsController.get('content').copy();
        numTeams = teams.get('length'),
        numMatches = self.eliminate(numTeams),
        numRounds = self.totalRounds(numMatches, numTeams);

    //first round
    var round = self.round(teams, numMatches, 1);
    bracket.get('rounds').pushObject(round);
    //other rounds
    numMatches = (numTeams - numMatches) / 2;
    for(i = 2; i <= numRounds; i++){
      var round = self.round(teams, numMatches, i);
      bracket.get('rounds').pushObject(round);
      numMatches = numMatches / 2;    
    }
  },
  round : function(_teams, numMatches, _rank){
    var self = this;
    var round = Brakkit.Round.create({ rank : _rank });
    var teams = [];
    var matches = [];
    for(var i = 0; i < numMatches; i++){
      matches.pushObject(Brakkit.Match.create({
        teams : [self.nextTeam(_teams), self.nextTeam(_teams)]
      }));
    }
    round.set('matches', matches);
    return round;
  },
  nextTeam : function(teams){
    var highest = 0,
        index = 0;
    teams.forEach(function(value, i){
      if(value.get('seed') > highest){
        index = i;
      }
    })
    var t = teams.objectAt(index);
    teams.removeObject(t);
    return t ? t : Brakkit.Team.anonymous;
  },
  calculate : function(){
    var self = this;
    self.createRounds(self.get('content'));
  },
  contentBinding : "Brakkit.BracketsController.selected",
});

//Teams
Brakkit.TeamsController = SC.ArrayProxy.create({
  content: [],
  loadTeams : function(){
    var self = this,
        bracket = Brakkit.BracketController.get('content');
    self.set('content',[]);
    if(bracket){
      bracket.get('teams').forEach(function(value){
        $.getJSON('/teams/'+value, function(data){
          self.pushObject(Brakkit.Team.create(data));
        });
      });
    }
  }.observes("Brakkit.BracketController.content"),
  addTeam: function(_name, _seed){
    var team = Brakkit.Team.create({
      name : _name,
      seed : Brakkit.Seeder.next(),
      bracket_id : Brakkit.BracketController.get('content').get('id')
    });
    this.pushObject(team);
    team.save(function(){
      Brakkit.BracketController.get('content').get('teams').pushObject(team.get('id'));
    });
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
    this.content.filter(function(value){
      return value.get('isSelected');
    }).forEach(function(value){
      self.removeObject(value);
      Brakkit.BracketController.get('content').get('teams').removeObject(value.get('id'));
      value.remove();
    });
    self.reseed();
  },
  anonymousTeam : function(){
    return Brakkit.Team.create({ name : "?" });
  }
});

//Rounds
Brakkit.RoundsController = SC.ArrayProxy.create({
  loadRounds : function(){
    // var self = this;
    // var c = [];
    // var bracket = Brakkit.BracketController.get('content');
    // if(bracket){
    //   bracket.get('rounds').forEach(function(value){
    //     $.getJSON('/rounds/'+value, function(data){
    //       c.pushObject(Brakkit.Round.create(data));
    //     });
    //   });
    // }
    // self.set('content', c);
  }.observes("content"),
  contentBinding : "Brakkit.BracketController.content.rounds"
});
