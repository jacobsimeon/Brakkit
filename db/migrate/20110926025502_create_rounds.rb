class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.integer :rank
      t.timestamps
    end
    create_table :teams_matches do |t|
      t.references :team
      t.references :match
    end
  end
end
