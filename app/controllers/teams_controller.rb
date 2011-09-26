class TeamsController < ApplicationController
  respond_to :json

  # GET /teams/1.json  
  def show
    @team = Team.find(params[:id])
    respond_with @team
  end

  # POST /teams.json
  def create
    @team = Team.new(params[:team])
    current_bracket.teams.push @team
    @team.save
    respond_with @team
  end

  # PUT /teams/1.json
  def update
    @team = Team.find(params[:id])
    @team.update_attributes(params[:team])
    respond_with @team
  end

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
