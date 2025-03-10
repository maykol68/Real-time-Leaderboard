Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  mount_devise_token_auth_for 'User', at: 'auth'

  # root "posts#index"

  namespace :api do
    namespace :v1 do
      resources :scores, only: [:create, :index] 

    end
  end

end
