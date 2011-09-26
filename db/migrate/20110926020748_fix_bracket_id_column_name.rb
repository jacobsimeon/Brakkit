class FixBracketIdColumnName < ActiveRecord::Migration
  def up
    remove_column :teams, :brackets_id
    add_column :teams, :bracket_id, :int
  end

  def down
  end
end
