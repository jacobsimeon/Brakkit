class MatchesController < ApplicationController
  respond_to :json
  
  # GET /matches/1.json
  def show
    respond_with Match.find(params[:id])
  end

  # POST /matches.json
  def create
    @match = Match.create(params[:round])
    respond_with @match
  end

  # PUT /matches/1.json
  def update
    @match = Match.find(params[:id])
    @match.update_attributes(params[:round])
    respond_with @match
  end

  # DELETE /matches/1.json
  def destroy
    @match = Match.find(params[:id])
    @match.destroy
    respond_with @match
  end
end
