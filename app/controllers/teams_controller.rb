class TeamsController < ApplicationController
  # GET /teams/1
  # GET /teams/1.json
  respond_to :json
  def show
    @team = Team.find(params[:id])
    respond_with @team
  end

  # GET /teams/1/edit
  def edit
    @team = Team.find(params[:id])
  end

  # POST /teams
  # POST /teams.json
  def create
    @team = Team.new(params[:team])
    @team.save
    respond_with @team
  end

  # PUT /teams/1
  # PUT /teams/1.json
  def update
    @team = Team.find(params[:id])
    @team.update_attributes(params[:team])
    respond_with @team
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    @team = Team.find(params[:id])
    @team.destroy
    respond_with 
    respond_to do |format|
      format.html { redirect_to teams_url }
      format.json { head :ok }
    end
  end
end
