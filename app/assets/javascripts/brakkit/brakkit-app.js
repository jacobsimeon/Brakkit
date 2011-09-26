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
Brakkit.startup = function(){
  Brakkit.BracketsController.loadBrackets();  
};
$(function(){
  Brakkit.alerts.setHideTimeout();
  Brakkit.startup();
});