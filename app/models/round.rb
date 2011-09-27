class Round < ActiveRecord::Base
  has_many :matches
  def as_json options
    {
      id: self.id,
      rank: self.rank,
      matches: self.matches.map{ |m| m.id }
    }
  end
end
