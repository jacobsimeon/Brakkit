class CreateBrackets < ActiveRecord::Migration
  def change
    create_table :brackets do |t|
      t.references :user
      t.string :title
      t.timestamps
    end
  end
end
