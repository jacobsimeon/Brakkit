class Bracket < ActiveRecord::Base
  has_many :teams
  has_many :rounds
  
  def as_json options
    {
      id: self.id,
      teams: self.teams.map{ |t| t.id },
      rounds: self.rounds.map{ |r| r.id },
      title: self.title
    }
  end
end
