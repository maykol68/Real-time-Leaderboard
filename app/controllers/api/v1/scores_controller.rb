class Api::V1::ScoresController < ApplicationController
  before_action :authenticate_user!

  def index
    if params[:game_id].present?
      @scores = Score.includes(:user, :game)
                     .where(game_id: params[:game_id])
                     .order(points: :desc)
                     .limit(10) # 👈 Solo los 10 mejores
    else
      @scores = Score.includes(:user, :game).order(created_at: :desc)
    end
  
    render json: @scores, include: [:user, :game]
  end
  

  def create
    @score = current_user.scores.new(score_params)

    if @score.save
      broadcast_score(@score)  # 👈 Llamamos la función para enviar los datos
      render json: @score, include: [:user, :game], status: :created
    else
      render json: { errors: @score.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:score).permit(:game_id, :points)
  end

  def broadcast_score(score)
    broadcast_data = {
      id: score.id,
      points: score.points,
      user_name: score.user&.name || "Anónimo",  # 👈 Evita nil con `&.`
      game_name: score.game&.name || "Juego desconocido"  # 👈 Verifica que `name` exista
    }
    ActionCable.server.broadcast("scores_channel", broadcast_data)
  end
end
