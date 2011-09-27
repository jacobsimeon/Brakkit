describe("Brakkit.BracketController", function(){
  var createTeams = function(br, numTeams){
    var t;
    for(var i = 1; i <= numTeams; i++){
      t = Brakkit.Team.create({ name : "Team " + i });
      br.get('teams').pushObject(t);
    }    
  };
  var expectRounds = function(o){
    var b = Brakkit.Bracket.create({ title : "Test Bracket", teams : [], rounds : [] });
    createTeams(b, o.numTeams);
    Brakkit.BracketController.createRounds(b);
    expect(b.get('rounds').get('length'))
      .toEqual(o.numRounds, o.numTeams+" teams should have "+o.numRounds+" round(s)");
  };
  
  it("creates rounds", function(){
    expectRounds({ numTeams : 2, numRounds : 1});
    expectRounds({ numTeams : 3, numRounds : 2});
    expectRounds({ numTeams : 4, numRounds : 2});
    expectRounds({ numTeams : 5, numRounds : 3});
    expectRounds({ numTeams : 6, numRounds : 3});
    expectRounds({ numTeams : 7, numRounds : 3});
    expectRounds({ numTeams : 8, numRounds : 3});
    expectRounds({ numTeams : 9, numRounds : 4});
    expectRounds({ numTeams : 10, numRounds : 4});
    expectRounds({ numTeams : 11, numRounds : 4});
    expectRounds({ numTeams : 12, numRounds : 4});
    expectRounds({ numTeams : 13, numRounds : 4});
    expectRounds({ numTeams : 14, numRounds : 4});
    expectRounds({ numTeams : 15, numRounds : 4});
    expectRounds({ numTeams : 16, numRounds : 4});
    expectRounds({ numTeams : 17, numRounds : 5});
    expectRounds({ numTeams : 18, numRounds : 5});
    expectRounds({ numTeams : 19, numRounds : 5});
    expectRounds({ numTeams : 20, numRounds : 5});
  });
  
});