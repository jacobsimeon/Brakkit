Brakkit.WinnerController = SC.Object.create({
  setWinner : function(round, match, winner){
    var self = this;
    var validTeams = function(){
      return match.get('teams').contains(Brakkit.Team.anonymous);
    }
    if(!validTeams){
      alert("Please wait until the match is completed before selecting a winner.");
      return false;
    }
    var nextRound = self.getNextRound(round);
    if(!nextRound){
      alert("Congratulations to " + winner.get('name') + "!\n You won!");
      return false;
    }
    if(match.get('winner') == null || match.get('winner') == Brakkit.Team.anonymous){
      match.set('winner', winner);
      //match.save();
      Brakkit.RoundsController.addTeamToRound(nextRound, winner);
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
