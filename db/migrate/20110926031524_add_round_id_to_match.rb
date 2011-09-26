class AddRoundIdToMatch < ActiveRecord::Migration
  def change
    add_column :matches, :round_id, :int
  end
end
