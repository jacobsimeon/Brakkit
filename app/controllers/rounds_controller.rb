class RoundsController < ApplicationController
  respond_to :json

  # GET /rounds/1.json
  def show
    respond_with Round.find(params[:id])
  end

  # POST /rounds.json
  def create
    @round = Round.create(params[:round])
    respond_with @round
  end

  # PUT /rounds/1.json
  def update
    @round = Round.find(params[:id])
    @round.update_attributes(params[:round])
    respond_with @round
  end

  # DELETE /rounds/1.json
  def destroy
    @round = Round.find(params[:id])
    @round.destroy
    respond_with @round
  end
end
