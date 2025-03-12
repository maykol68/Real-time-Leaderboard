module Api
    module V1
      class GamesController < ApplicationController
        before_action :authenticate_user!
  
        def index
          games = Game.all
          render json: games
        end
      end
    end
  end
  