
//= require ./brakkit-app

/* Views */
//Brackets
// Brakkit.BracketSelectBox = {
//   show : function(){
//     $('#bracket-list-wrapper').show();
//     $(document).click(Brakkit.BracketSelectBox.hide);
//   },
//   hide : function(){
//     $('#bracket-list-wrapper').hide();
//     $(document).unbind('click', Brakkit.BracketSelectBox.hide);
//   }
// };
// Brakkit.BracketSelectView = SC.View.extend({
//   click : function(){
//     Brakkit.BracketSelectBox.show();
//   }
// });
// Brakkit.BracketTitleListItemView = SC.View.extend({
//   mouseDown : function(){
//     Brakkit.BracketsController.selectBracket(this.get('content'));
//   }
// });
// Brakkit.NewBracketListItem = SC.View.extend({
//   mouseDown : function(){
//     Brakkit.BracketSelectBox.hide();
//     $('#new-bracket').fadeIn();
//   }
// });
// Brakkit.NewBracketTitleView = SC.TextField.extend({
//   insertNewline : function(){
//     var bracketTitle =  this.get('value');
//     if(bracketTitle){
//       Brakkit.BracketsController.addBracket(bracketTitle);
//       $('#new-bracket').fadeOut();
//     }
//   }  
// });
// Brakkit.GoButtonView = SC.Button.extend({
//   target : "Brakkit.BracketController",
//   action : "calculate"
// })
// //Teams
// Brakkit.AddTeamView = SC.TextField.extend({
//   insertNewline: function(){
//     var teamName =  this.get('value');
//     if(teamName){
//       Brakkit.TeamsController.addTeam(teamName, 0);
//       this.set('value', '');
//     }
//   }
// });
// 
// Brakkit.TeamNamesListView = SC.CollectionView.extend({
// });
// 
// Brakkit.TeamNameListItemView = SC.View.extend({
//   mouseDown : function(){
//     this.parentView.get('content').set('isSelected', !this.parentView.get('content').get('isSelected'));
//   }
// });
// 
// Brakkit.DeleteSelectedTeamsButtonView = SC.Button.extend({
//   target : "Brakkit.TeamsController",
//   action : "removeSelected"
// });

// Brakkit.BracketView = SC.CollectionView.extend({
//   moveWinner : function(round, team){
//     
//   }
// });
// Brakkit.RoundView = SC.View.extend({
//   style : function(){
//     var self = this;
//     var left = (self.parentView.get('content').get('rank')-1) * (204);
//     var bg = (self.parentView.get('content').get('rank') % 2 === 0) ? '#CCB;' : 'whitesmoke;'
//     return "left: "+left+"px; background: "+bg;
//   }.property(),
// })
// Brakkit.MatchesView = SC.CollectionView.extend({})
// Brakkit.MatchView = SC.CollectionView.extend({});
// Brakkit.TeamView = SC.Button.extend({
//   isWinner : null,
//   click : function(){
//     var self = this;
//     var match = self.parentView.parentView.parentView.get('content');
//     var roundView = self.parentView.parentView.parentView.parentView.parentView;
//     var round = roundView.get('content');
//     var team = self.get('content');
//     if(!self.get('isWinner')){
//       if(match.get('teams').contains(Brakkit.Team.anonymous)){
//         alert("Please wait until the match is completed.");
//       } else {
//         Brakkit.WinnerController.setWinner(round, match, team);
//         self.set('isWinner', true);
//       }
//     } else {
//       alert("Sorry, winner cannot be changed.");
//     }
//   }
// });