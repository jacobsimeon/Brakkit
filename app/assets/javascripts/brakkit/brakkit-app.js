var Brakkit = SC.Application.create();
Brakkit.alerts = {
  setHideTimeout: function(){
    setTimeout(Brakkit.alerts.hide, 3000);
  },
  hide : function(){
    $('#notices').find('p').slideUp(function(){
      $(this).detach();
    });      
  }
};

Brakkit.BracketsController = SC.ArrayProxy.create({
  content : [],
  selected : null,
  addBracket : function(_title){
    var self= this;
    var bracket = Brakkit.Bracket.create({
      title : _title,
      teams : []
    });
    this.pushObject(bracket);
    bracket.save(function(){
      self.selectBracket(bracket);
    });
  },
  loadBrackets : function(){
    var self = this;
    $.getJSON('/brackets',function(data, status, xhr){
      data.forEach(function(value){
        var bracket = Brakkit.Bracket.create(value);
        self.pushObject(bracket);
      });
      if(self.get('length') === 0){
         $('#new-bracket').show();
      } else {
        self.selectBracket(self.objectAt(0));
      }
    });    
  },
  selectBracket : function(bracket){
    //set the current bracket
    Brakkit.BracketsController.set('selected', bracket);
  }
});