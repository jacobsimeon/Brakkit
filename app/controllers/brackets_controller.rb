class BracketsController < ApplicationController
  respond_to :json

  # GET /brackets
  # GET /brackets.json
  def index
    respond_with user.brackets
  end

  # GET /brackets/1
  # GET /brackets/1.json
  def show
    @bracket = Bracket.find(params[:id])
    session[:current_bracket] = @bracket.id
    respond_with @bracket
  end

  # POST /brackets
  # POST /brackets.json
  def create
    @bracket = Bracket.new(params[:bracket])
    respond_with @bracket
  end

  # PUT /brackets/1
  # PUT /brackets/1.json
  def update
    @bracket = Bracket.find(params[:id])
    respond_with @bracket
  end

  # DELETE /brackets/1
  # DELETE /brackets/1.json
  def destroy
    @bracket = Bracket.find(params[:id])
    @bracket.destroy
    respond_with @bracket
  end
end
