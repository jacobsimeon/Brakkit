class RoundsController < ApplicationController
  respond_to :json
  
  # GET /rounds
  # GET /rounds.json
  def index
    @rounds = Round.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @rounds }
    end
  end

  # GET /rounds/1
  # GET /rounds/1.json
  def show
    @round = Round.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @round }
    end
  end

  # GET /rounds/new
  # GET /rounds/new.json
  def new
    @round = Round.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @round }
    end
  end

  # GET /rounds/1/edit
  def edit
    @round = Round.find(params[:id])
  end

  # POST /rounds
  # POST /rounds.json
  def create
    @round = Round.new(params[:round])

    respond_to do |format|
      if @round.save
        format.html { redirect_to @round, notice: 'Round was successfully created.' }
        format.json { render json: @round, status: :created, location: @round }
      else
        format.html { render action: "new" }
        format.json { render json: @round.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /rounds/1
  # PUT /rounds/1.json
  def update
    @round = Round.find(params[:id])

    respond_to do |format|
      if @round.update_attributes(params[:round])
        format.html { redirect_to @round, notice: 'Round was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @round.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rounds/1
  # DELETE /rounds/1.json
  def destroy
    @round = Round.find(params[:id])
    @round.destroy

    respond_to do |format|
      format.html { redirect_to rounds_url }
      format.json { head :ok }
    end
  end
end
