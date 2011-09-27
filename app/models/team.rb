class Team < ActiveRecord::Base
  has_one :bracket
  has_and_belongs_to_many :matches

  def as_json(optins)
    {
      id: self.id,
      name: self.name,
      seed: self.seed
    }
  end
  
end
