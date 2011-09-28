Brakkit.GoButtonView = SC.Button.extend({
  target : "Brakkit.BracketController",
  action : "calculate"
})
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