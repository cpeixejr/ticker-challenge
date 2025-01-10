class TickersController < ApplicationController
  def show
    ticker = params[:ticker]
    start_date = params[:start_date]
    end_date = params[:end_date]

    begin
      service = TickerDataService.new(ticker, start_date, end_date)
      result = service.fetch_and_aggregate_data

      render json: {
        ticker: ticker,
        max: result[:max],
        min: result[:min],
        average: result[:average]
      }
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
end
