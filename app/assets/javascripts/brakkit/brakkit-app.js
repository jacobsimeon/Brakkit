var Brakkit = SC.Application.create();
Brakkit.alerts = {
  setHideTimeout: function(){
    setTimeout(Brakkit.alerts.hide, 3000);
  },
  hide : function(){
    $('#notices').find('p').slideUp(function(){
      $(this).detach();
    });      
  }
};
/* Models */
Brakkit.Bracket = SC.Object.extend({
  title : "",
  teams : []
});
Brakkit.Round = SC.Object.extend({
  matches : []
});
Brakkit.Match = SC.Object.extend({
  first_team : null,
  second_team : null
});
Brakkit.Team = SC.Object.extend({
  name: "",
  seed: 0,
  isSelected: false
});
Brakkit.Seed = {
  next : function(){
    return Brakkit.TeamsController.get('length') + 1;
  }
};

/* Controllers */
// Brackets
Brakkit.BracketsController = SC.ArrayProxy.create({
  content : [],
  selected : {},
  addBracket : function(_title){
    var bracket = Brakkit.Bracket.create({
      title : _title,
      teams : [
        Brakkit.Team.create({
          name : "BSU Broncos",
          seed : 1
        }),
        Brakkit.Team.create({
          name: "CSU Rams",
          seed : 2
        })
      ]
    });
    this.pushObject(bracket);
    this.set('selected', bracket);
  },
  startup : function(){
    if(Brakkit.BracketsController.get('length') == 0){
       $('#new-bracket').show();
    } else {
      this.set('selected', this.objectAt(0));
    }
  }
});
Brakkit.BracketController = SC.Object.create({
  contentBinding : "Brakkit.BracketsController.selected"
});

$(function(){
  Brakkit.BracketsController.startup();  
  Brakkit.RoundsController.setRounds();
});

//Teams
Brakkit.TeamsController = SC.ArrayProxy.create({
  contentBinding : "Brakkit.BracketController.content.teams",
  addTeam: function(_name, _seed){
    var team = Brakkit.Team.create({
      name : _name,
      seed : Brakkit.Seed.next()
    });
    this.pushObject(team);
    Brakkit.RoundsController.setRounds();
  },
  reseed : function(){
    var seed = 1;
    this.content.forEach(function(value){
      value.set('seed', seed);
      seed = seed + 1;
    });
  },
  removeSelected: function(){
    var numberToDelete = this.content.filter(function(value){
      return value.get('isSelected');
    }).length;
    if((Brakkit.TeamsController.get('length') - numberToDelete) >= 2){
      this.content.forEach(function(value){
        if(value.get('isSelected')){
          Brakkit.TeamsController.removeObject(value);
        }
      });
      Brakkit.TeamsController.reseed();
      Brakkit.RoundsController.setRounds();
    } else {
      alert("There must be at least two players for the tournament.");
    }
  }
});


Brakkit.Eliminator = {
  eliminate : function(from){
    var divisor = from < 4 ? 2 : 4;
    if(from % divisor == 0){
      return 0;
    }
    var matches = []
    for(var i=0; i <= from/2; i++){
      if((from - i) % divisor == 0){
        matches.push(i);
      }
    }
    return matches[matches.length-1];    
  }
};

//Rounds
Brakkit.RoundsController = SC.ArrayProxy.create({
  setRounds : function(){
    var bracket = Brakkit.BracketController.get('content');
    var teams = Brakkit.TeamsController.get('content');
    var teamsAllocated = 0;
    if(bracket && teams){
      var rounds = [];
      var numberOfTeams = teams.get('length');
      //the first round of the tournament has to even out the number of remaining teams
      //make sure we're playing the exact number of teams that, after elimination, will yeild a multiple of 4
      //ex: if there are 17 team, eliminate 5 teams in the first round to yeild 12 remaining teams in the second
      var teamsToEliminate = Brakkit.Eliminator.eliminate(numberOfTeams);
      //Make the teams with the highest seed compete in the first round of elimination
      //teams with higher seeds will automatically advance to the next round
      var seedThreshold = numberOfTeams - teamsToEliminate;
      var teamsInFirstRound = teams.filter(function(item){
        return item.get('seed') > seedThreshold;
      });
      //if we already have a nice number of teams
      if(teamsInFirstRound.length == 0){
        //Add all the teams!
        teamsInFirstRound = teams;
      }
      //create the first round
      rounds.push(
        Brakkit.Round.create({
          teams : teamsInFirstRound
        })
      );
      //create the second round
      if(teamsInFirstRound.length < numberOfTeams){
        var teamsInSecondRound = teams.filter(function(item){
          return item.get('seed') <= seedThreshold;
        })
        rounds.push(
          Brakkit.Round.create({
            teams : teamsInSecondRound
          })
        )
      }
      if(rounds[0].get('teams').length + rounds[1].get('teams').length != numberOfTeams){
        alert("Unable to allocate all teams");
      }
      Brakkit.RoundsController.set('content', rounds);
    }
  }.observes("Brakkit.BracketController.content"),
  content : []
})

/* Views */
//Brackets
Brakkit.BracketSelectBox = {
  show : function(){
    $('#bracket-list-wrapper').show();
    $(document).click(Brakkit.BracketSelectBox.hide)
  },
  hide : function(){
    $('#bracket-list-wrapper').hide();
    $(document).unbind('click', Brakkit.BracketSelectBox.hide);
  }
};
Brakkit.BracketSelectView = SC.View.extend({
  click : function(){
    Brakkit.BracketSelectBox.show();
  }
});
Brakkit.BracketTitleListItemView = SC.View.extend({
  mouseDown : function(){
    Brakkit.BracketsController.set('selected', this.get('content'));
  }
});
Brakkit.NewBracketListItem = SC.View.extend({
  mouseDown : function(){
    Brakkit.BracketSelectBox.hide();
    $('#new-bracket').fadeIn();
  }
})
Brakkit.NewBracketTitleView = SC.TextField.extend({
  insertNewline : function(){
    var bracketTitle =  this.get('value');
    if(bracketTitle){
      Brakkit.BracketsController.addBracket(bracketTitle);
      $('#new-bracket').fadeOut();
    }
  }  
});


//Teams
Brakkit.AddTeamView = SC.TextField.extend({
  insertNewline: function(){
    var teamName =  this.get('value');
    if(teamName){
      Brakkit.TeamsController.addTeam(teamName, 0);
      this.set('value', '');
    }
  }
});

Brakkit.TeamNamesListView = SC.CollectionView.extend({
});

Brakkit.TeamNameListItemView = SC.View.extend({
  mouseDown : function(){
    this.parentView.get('content').set('isSelected', !this.parentView.get('content').get('isSelected'));
  }
});

Brakkit.DeleteSelectedTeamsButtonView = SC.Button.extend({
  target : "Brakkit.TeamsController",
  action : "removeSelected"
});

Brakkit.alerts.setHideTimeout();