class ScoresController < ApplicationController
    before_action :authenticate_user! # Asegura que el usuario esté autenticado si usas Devise
  
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
  