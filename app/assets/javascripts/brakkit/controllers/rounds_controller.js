//Rounds
Brakkit.RoundsController = SC.ArrayProxy.create({
  addTeamToRound : function(round, team){
    var self = this;
    var index = self.indexOf(round);
    var teamIndex = null;
    var nextRound = self.objectAt(index + 1);
    var nextMatch = Brakkit.MatchesController.nextAvailableMatch(round);
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
    nextMatch.save();
  },
  loadRounds : function(){
    var self = this,
        bracket = Brakkit.BracketController.get('content'),
        rounds = [];
    if(!bracket) return false;
    Brakkit.BracketController.get('content').get('rounds').forEach(function(round_id){
      $.getJSON('/rounds/' + round_id, function(data){
        var r = Brakkit.Round.create({
          rank : data.rank,
          id : data.id,
          matches : data.matches.map(function(m){
            return Brakkit.Match.create({
              id : m.id,
              winner : m.winner ? null : Brakkit.TeamsController.findTeam(m.winner),
              teams : function(){
                if(m.teams.length == 0){
                  return [ Brakkit.Team.anonymous, Brakkit.Team.anonymous ]
                }
                if(m.teams.length == 1){
                  return [Brakkit.Team.create(m.teams[0]), Brakkit.Team.anonymous];
                }
                return m.teams.map(function(team){
                  return Brakkit.Team.create(team);
                })
              }()
            })
          })
        });
        rounds.pushObject(r);
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
