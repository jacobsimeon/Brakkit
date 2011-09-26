Brakkit::Application.routes.draw do
  get "home/index"
  devise_for :users
  resources :brackets
  resources :teams
  root :to => "home#index"
end
