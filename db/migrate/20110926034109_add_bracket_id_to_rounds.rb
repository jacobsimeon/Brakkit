class AddBracketIdToRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :bracket_id, :int
  end
end
