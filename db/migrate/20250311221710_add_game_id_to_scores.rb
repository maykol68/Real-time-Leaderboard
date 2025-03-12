class AddGameIdToScores < ActiveRecord::Migration[8.0]
  def change
    add_column :scores, :game_id, :integer
  end
end
