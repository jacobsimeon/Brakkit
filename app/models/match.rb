class Match < ActiveRecord::Base
  has_and_belongs_to_many :teams
  
  def winner
    self.teams.find { |t| t.id == self.winner_id }
  end
  
  def winner=(team)
    self.winner_id = team.id
    self.save
  end
  
  def as_json options
    {
      id: self.id,
      teams: self.teams,
      winner: self.winner_id
    }
  end
  
end
