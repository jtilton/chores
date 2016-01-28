class CreateMappings < ActiveRecord::Migration
  def change
    create_table :mappings do |t|
      t.integer :roommate_id
      t.integer :task_id
      t.integer :offset
      t.datetime :ds
      t.timestamp :completed_at

      t.timestamps null: false
    end
  end
end
