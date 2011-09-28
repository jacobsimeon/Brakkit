Brakkit.WinnerController = SC.Object.create({
  setWinner : function(round, match, winner){
    var self = this;
    var validTeams = !match.get('teams').contains(Brakkit.Team.anonymous);
    if(!validTeams){
      alert("Please wait until the match is completed before selecting a winner.");
      return false;
    }
    var nextRound = self.getNextRound(round);
    if(match.get('winner') == null || match.get('winner') == Brakkit.Team.anonymous){
      match.set('winner', winner);
      if(nextRound){
        Brakkit.RoundsController.addTeamToRound(nextRound, winner);
      } else {
        alert("Congratulations to " + winner.get('name') + "!\n You won!");
      }
      match.save();
      return true;
    } else {
      alert("Sorry, cannot change winner");
    }
  },
  getNextRound : function(round){
    var nr = Brakkit.RoundsController.filter(function(r){
      return r.get('rank') === (round.get('rank') + 1);
    }).objectAt(0);
    return nr;
  }
});
