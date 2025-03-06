class Api::HelloController < ApplicationController
    def index
        render json: { message: "¡Hola desde Rails API!" }
      end
end
