Brakkit.TeamView = SC.Button.extend({
  match : function(){
    return this.parentView.parentView.parentView.get('content');    
  }.property(),
  isWinner : function(){
    var self = this;
    var winner = self.get('match').get('winner');
    if(winner){
      return winner.get('id') == self.get('content').get('id');
    }
    return false;
  }.property('match.winner'),
  click : function(){
    var self = this;
    var match = self.get('match');
    var roundView = self.parentView.parentView.parentView.parentView.parentView;
    var round = roundView.get('content');
    var team = self.get('content');
    Brakkit.WinnerController.setWinner(round, match, team);
  }
});