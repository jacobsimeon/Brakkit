Brakkit.RoundView = SC.View.extend({
  style : function(){
    var self = this;
    var left = (self.parentView.get('content').get('rank')-1) * (204);
    var bg = (self.parentView.get('content').get('rank') % 2 === 0) ? '#CCB;' : 'whitesmoke;'
    return "left: "+left+"px; background: "+bg;
  }.property(),
})
