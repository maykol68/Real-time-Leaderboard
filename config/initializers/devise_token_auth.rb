# frozen_string_literal: true

DeviseTokenAuth.setup do |config|

  config.token_cost = Rails.env.test? ? 4 : 10
  config.change_headers_on_each_request = false  # Esto evita que los headers cambien con cada request
  config.token_lifespan = 2.weeks
  config.batch_request_buffer_throttle = 5.seconds
  config.enable_standard_devise_support = false
end