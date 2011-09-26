class Match < ActiveRecord::Base
  has_and_belongs_to_many :teams
  def winner
    self.teams.find { |t| t.id == self.winner_id }
  end
  def winner=(team)
    self.winner_id = team.id
    self.save
  end
end
