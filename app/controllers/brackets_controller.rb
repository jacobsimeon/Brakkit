class BracketsController < ApplicationController
  respond_to :json

  # GET /brackets.json
  def index
    respond_with current_user.brackets
  end

  # GET /brackets/1.json
  def show
    @bracket = Bracket.find(params[:id])
    respond_with @bracket
  end

  # POST /brackets.json
  def create
    @bracket = Bracket.create(params[:bracket])
    current_user.brackets.push @bracket
    respond_with @bracket
  end

  # PUT /brackets/1.json
  def update
    @bracket = Bracket.find(params[:id])
    respond_with @bracket
  end

  # DELETE /brackets/1.json
  def destroy
    @bracket = Bracket.find(params[:id])
    @bracket.destroy
    respond_with @bracket
  end

end
