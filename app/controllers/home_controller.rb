class HomeController < ApplicationController
  def index
    render :layout => 'brackets', :action => 'brackets' and return if user_signed_in?
  end
  def brackets
  end
end
