class RemoveJoinTablePrimaryKey < ActiveRecord::Migration
  def up
    remove_column :matches_teams, :id
  end

  def down
  end
end
