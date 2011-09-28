//Rounds
Brakkit.RoundsController = SC.ArrayProxy.create({
  addTeamToRound : function(round, team){
    console.log(team);
    var self = this;
    var index = self.indexOf(round);
    var teamIndex = null;
    var nextRound = self.objectAt(index + 1);
    var nextMatch = Brakkit.MatchesController.nextAvailableMatch(round);
    // var nextMatch = nextRound.get('matches').filter(function(match){
    //   var ts = match.get('teams');
    //   return ts.contains(Brakkit.Team.anonymous);
    // }).objectAt(0);
    if(!nextMatch){
      return false;
    }
    nextMatch.get('teams').forEach(function(t, i){
      if(t === Brakkit.Team.anonymous && teamIndex === null){
        teamIndex = i;
      }
    });
    nmTeams = nextMatch.get('teams').copy();
    nmTeams[teamIndex] = team;
    nextMatch.set('teams', nmTeams);
  },
  loadRounds : function(){
    var self = this,
        bracket = Brakkit.BracketController.get('content'),
        rounds = [];
    if(!bracket) return false;
    Brakkit.BracketController.get('content').get('rounds').forEach(function(round_id){
      $.getJSON('/rounds/' + round_id, function(data){
        rounds.pushObject(Brakkit.Round.create(data));
      });
    });
    self.set('content', rounds);
  }.observes("Brakkit.BracketController.content.rounds"),
  clearRounds : function(){
    var self = this;
    if(self.get('length') > 0){
      self.invoke('remove');
    }
    self.set('content',[]);
  },
  content : []
});
