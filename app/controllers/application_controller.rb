class ApplicationController < ActionController::Base
  protect_from_forgery
  def current_bracket=(id)
    session[:current_bracket] = id
  end
  def current_bracket
    Bracket.find session[:current_bracket]
  end
end
