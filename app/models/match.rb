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
  
  def update_teams team_ids
    if team_ids.is_a? Array
      self.teams.clear
      team_ids.each do |team_id|
        unless team_id == '0'
          team = Team.find team_id
          self.teams.push team
        end
      end
      self.save
    end
  end
  
end
