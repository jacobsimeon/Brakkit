
//= require ./brakkit-app

/* Controllers */
// Brackets
Brakkit.BracketsController = SC.ArrayProxy.create({
  content : [],
  selected : {},
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
  getBrackets : function(){
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
    $.getJSON('/brackets/' + bracket.get('id'), function(data){
      Brakkit.TeamsController.getTeams();
    });
  },
  startup : function(){
    Brakkit.BracketsController.getBrackets();
  }
});
Brakkit.BracketController = SC.Object.create({
  contentBinding : "Brakkit.BracketsController.selected"
});

$(function(){
  Brakkit.BracketsController.startup();
});

//Teams
Brakkit.TeamsController = SC.ArrayProxy.create({
  content: [],
  getTeams : function(){
    var self = this;
    console.log('getting teams');
    var c = [];
    $.getJSON('/teams', function(data){
      console.log(data);
      for(var i=0; i<data.length; i++){
        c.pushObject(Brakkit.Team.create(data[i]));
      }
      
      // data.forEach(function(value){
      //   console.log(value);
      //   c.push(Brakkit.Team.create(value));
      // });
    });
    self.set('content', c);
  }.observes(),
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


Brakkit.Eliminator = {
  eliminate : function(from){
    var divisor = from < 4 ? 2 : 4;
    if(from % divisor === 0){
      return 0;
    }
    var matches = [];
    for(var i=0; i <= from/2; i++){
      if((from - i) % divisor === 0){
        matches.push(i);
      }
    }
    return matches[matches.length-1];    
  }
};

//Rounds
Brakkit.RoundsController = SC.ArrayProxy.create({
  setRounds : function(){
    // var bracket = Brakkit.BracketController.get('content');
    // var teams = Brakkit.TeamsController.get('content');
    // var teamsAllocated = 0;
    // if(bracket && teams){
    //   var rounds = [];
    //   var numberOfTeams = teams.get('length');
    //   //the first round of the tournament has to even out the number of remaining teams
    //   //make sure we're playing the exact number of teams that, after elimination, will yeild a multiple of 4
    //   //ex: if there are 17 team, eliminate 5 teams in the first round to yeild 12 remaining teams in the second
    //   var teamsToEliminate = Brakkit.Eliminator.eliminate(numberOfTeams);
    //   //Make the teams with the highest seed compete in the first round of elimination
    //   //teams with higher seeds will automatically advance to the next round
    //   var seedThreshold = numberOfTeams - teamsToEliminate;
    //   var teamsInFirstRound = teams.filter(function(item){
    //     return item.get('seed') > seedThreshold;
    //   });
    //   //if we already have a nice number of teams
    //   if(teamsInFirstRound.length == 0){
    //     //Add all the teams!
    //     teamsInFirstRound = teams;
    //   }
    //   //create the first round
    //   rounds.push(
    //     Brakkit.Round.create({
    //       teams : teamsInFirstRound
    //     })
    //   );
    //   //create the second round
    //   if(teamsInFirstRound.length < numberOfTeams){
    //     var teamsInSecondRound = teams.filter(function(item){
    //       return item.get('seed') <= seedThreshold;
    //     })
    //     rounds.push(
    //       Brakkit.Round.create({
    //         teams : teamsInSecondRound
    //       })
    //     )
    //   }
    //   if(rounds[0].get('teams').length + rounds[1].get('teams').length != numberOfTeams){
    //     alert("Unable to allocate all teams");
    //   }
    //   Brakkit.RoundsController.set('content', rounds);
  //  }
  }.observes("Brakkit.BracketController.content"),
  content : []
});

