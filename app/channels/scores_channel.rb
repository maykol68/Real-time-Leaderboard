class ScoresChannel < ApplicationCable::Channel
    def subscribed
      stream_from "scores_channel"
    end
  
    def unsubscribed
      # Cleanup cuando el canal se desconecta
    end
  end
  