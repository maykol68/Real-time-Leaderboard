class Score < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :points, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }

  
  after_create_commit do
    broadcast_prepend_to "scores_channel"
  end

  
end
