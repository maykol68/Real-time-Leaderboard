module Api
  module V1
    class ScoresController < ApplicationController
      include DeviseTokenAuth::Concerns::SetUserByToken  # 👈 Asegura que Devise Token Auth funcione

      before_action :authenticate_user!

      def index
        scores = Score.where(user: current_user)
        render json: scores
      end

      def create
        score = current_user.scores.new(score_params)

        if score.save
          render json: { message: "Puntuación guardada", score: score }, status: :created
        else
          render json: { errors: score.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def score_params
        params.require(:score).permit(:game, :points)
      end
    end
  end
end
