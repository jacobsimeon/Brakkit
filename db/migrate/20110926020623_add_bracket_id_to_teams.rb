class AddBracketIdToTeams < ActiveRecord::Migration
  def change
    change_table :teams do |t|
      t.references :brackets
    end
  end
end
