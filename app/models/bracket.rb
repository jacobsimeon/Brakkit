class Bracket < ActiveRecord::Base
  has_many :teams
  has_many :rounds
end
