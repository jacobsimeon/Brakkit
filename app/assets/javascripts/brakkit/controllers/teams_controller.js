//Teams
Brakkit.TeamsController = SC.ArrayProxy.create({
  content: [],
  loadTeams : function(){
    var self = this,
        bracket = Brakkit.BracketController.get('content');
    self.set('content',[]);
    if(bracket){
      bracket.get('teams').forEach(function(value){
        $.getJSON('/teams/'+value, function(data){
          self.pushObject(Brakkit.Team.create(data));
        });
      });
    }
  }.observes("Brakkit.BracketController.content"),
  addTeam: function(_name, _seed){
    if(this.get('length') > 23){
      alert('Maximum of 24 Teams');
      return;
    }
    var team = Brakkit.Team.create({
      name : _name,
      seed : Brakkit.Seeder.next(),
      bracket_id : Brakkit.BracketController.get('content').get('id')
    });
    this.pushObject(team);
    team.save(function(){
      Brakkit.BracketController.get('content').get('teams').pushObject(team.get('id'));
    });
  },
  findTeam : function(id){
    var self = this;
    var teams = self.filter(function(team){
      return team.get('id') === parseInt(id);
    });
    return teams.get('length') > 0 ? teams.objectAt(0) : Brakkit.Team.anonymous;
  },
  reseed : function(){
    var seed = 1;
    this.content.forEach(function(value){
      value.set('seed', seed);
      value.save();
      seed = seed + 1;
    });
  },
  removeSelected: function(){
    var self = this;
    this.content.filter(function(value){
      return value.get('isSelected');
    }).forEach(function(value){
      self.removeObject(value);
      Brakkit.BracketController.get('content').get('teams').removeObject(value.get('id'));
      value.remove();
    });
    self.reseed();
  },
  anonymousTeam : function(){
    return Brakkit.Team.create({ name : "?" });
  }
});