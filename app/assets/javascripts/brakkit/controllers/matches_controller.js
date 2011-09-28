Brakkit.MatchesController = SC.Object.create({
  nextAvailableMatch : function(round){
    return round.get('matches').filter(function(match){
      var ts = match.get('teams');
      return ts.contains(Brakkit.Team.anonymous);
    }).objectAt(0);
  }
});