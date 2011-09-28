
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
    Brakkit.RoundsController.clearRounds();

    //first round
    var round = self.round(teams, numMatches, 1);
    Brakkit.RoundsController.pushObject(round);
    //other rounds
    numMatches = (numTeams - numMatches) / 2;
    for(i = 2; i <= numRounds; i++){
      var round = self.round(teams, numMatches, i);
      Brakkit.RoundsController.pushObject(round);
      numMatches = numMatches / 2;    
    }
  },
  round : function(_teams, numMatches, _rank){
    var self = this;
    var round = Brakkit.Round.create({ rank : _rank, bracket_id : self.get('content').get('id') });
    round.save();
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
    //var existingRounds = Brakkit.RoundsController.get('content');
    Brakkit.RoundsController.clearRounds();
    self.createRounds(self.get('content'));
  },
  contentBinding : "Brakkit.BracketsController.selected",
});
