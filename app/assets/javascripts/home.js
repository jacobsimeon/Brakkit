var Brakkit = {
  alerts : {
    setHideTimeout: function(){
      setTimeout(Brakkit.alerts.hide, 10000);
    },
    hide : function(){
      $('p.notice').slideUp(function(){
        $(this).detach();
      });      
    }
  }
}
Brakkit.alerts.setHideTimeout();