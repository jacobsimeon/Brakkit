class AddWinnerKey < ActiveRecord::Migration
  def up
    add_column :matches, :winner_id, :int
  end

  def down
  end
end
