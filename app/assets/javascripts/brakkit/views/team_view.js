Brakkit.TeamView = SC.Button.extend({
  isWinner : null,
  click : function(){
    var self = this;
    var match = self.parentView.parentView.parentView.get('content');
    var roundView = self.parentView.parentView.parentView.parentView.parentView;
    var round = roundView.get('content');
    var team = self.get('content');
    if(!self.get('isWinner')){
      if(match.get('teams').contains(Brakkit.Team.anonymous)){
        alert("Please wait until the match is completed.");
      } else {
        Brakkit.WinnerController.setWinner(round, match, team);
        self.set('isWinner', true);
      }
    } else {
      alert("Sorry, winner cannot be changed.");
    }
  }
});