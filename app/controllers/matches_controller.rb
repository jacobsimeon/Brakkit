class MatchesController < ApplicationController
  respond_to :json
  
  # GET /matches/1.json
  def show
    respond_with Match.find(params[:id])
  end

  # POST /matches.json
  def create
    @round = Round.find params[:round_id]
    if @round
      @round.matches.clear
      @match = Match.create      
      respond_with @match and return unless params[:teams].respond_to? :values
      params[:teams].values do |team_id|
        unless (team_id == 'null') || (team_id == '0') || (team_id == 0) || (team_id.nil?)
          team = Team.find(team_id)
          @match.teams.push(team) unless team.nil?
        end
      end
      @round.matches.push @match
    end
    respond_with @match
  end

  # PUT /matches/1.json
  def update
    @match = Match.find(params[:id])
    @match.update_attributes(params[:match])
    respond_with @match
  end

  # DELETE /matches/1.json
  def destroy
    @match = Match.find(params[:id])
    @match.destroy
    respond_with @match
  end
end
