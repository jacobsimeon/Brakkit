class FixJoinTableName < ActiveRecord::Migration
  def up
    create_table :matches_teams do |t|
      t.references :team
      t.references :match
    end
    drop_table :teams_matches
  end

  def down
  end
end
