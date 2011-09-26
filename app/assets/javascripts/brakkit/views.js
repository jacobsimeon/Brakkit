
//= require ./brakkit-app

/* Views */
//Brackets
Brakkit.BracketSelectBox = {
  show : function(){
    $('#bracket-list-wrapper').show();
    $(document).click(Brakkit.BracketSelectBox.hide);
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
    Brakkit.BracketsController.selectBracket(this.get('content'));
  }
});
Brakkit.NewBracketListItem = SC.View.extend({
  mouseDown : function(){
    Brakkit.BracketSelectBox.hide();
    $('#new-bracket').fadeIn();
  }
});
Brakkit.NewBracketTitleView = SC.TextField.extend({
  insertNewline : function(){
    var bracketTitle =  this.get('value');
    if(bracketTitle){
      Brakkit.BracketsController.addBracket(bracketTitle);
      $('#new-bracket').fadeOut();
    }
  }  
});
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
