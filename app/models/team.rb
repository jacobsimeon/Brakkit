class Team < ActiveRecord::Base
  has_one :bracket
  has_and_belongs_to_many :matches
end
