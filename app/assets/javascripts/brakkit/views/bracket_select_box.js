//views related to the bracket select (fly-out) box

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