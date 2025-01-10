class TickerDataService
  require 'httparty'

  def initialize(ticker, start_date, end_date)
    @ticker = ticker
    @start_date = start_date.to_date
    @end_date = end_date.to_date
  end

  def fetch_and_aggregate_data
    # Verificar quais dias já estão salvos no banco
    saved_dates = TickerDatum.where(ticker: @ticker, date: @start_date..@end_date).pluck(:date)

    # Determinar os dias que precisam ser buscados na API
    missing_dates = (@start_date..@end_date).to_a - saved_dates

    fetch_missing_data(missing_dates) if missing_dates.any?

    # Recuperar todos os dados salvos no intervalo
    ticker_data = TickerDatum.where(ticker: @ticker, date: @start_date..@end_date)

    aggregate_data(ticker_data)
  end

  private

  def fetch_missing_data(missing_dates)
    api_key = ENV['POLYGON_API_KEY']
    url = "https://api.polygon.io/v2/aggs/ticker/#{@ticker}/range/1/day/#{missing_dates.first}/#{missing_dates.last}?apiKey=#{api_key}"

    response = HTTParty.get(url)

    if response.success?
      data = response.parsed_response['results']

      if data.present?
        # Registrar dias sem negociação
        api_dates = data.map { |entry| Date.parse(Time.at(entry['t'] / 1000).to_s) }
        no_trading_dates = missing_dates - api_dates

        no_trading_dates.each do |date|
          TickerDatum.create(
            ticker: @ticker,
            date: date,
            no_trading: true
          )
        end

        # Salvar os dados retornados no banco
        data.each do |entry|
          TickerDatum.create(
            ticker: @ticker,
            date: Date.parse(Time.at(entry['t'] / 1000).to_s),
            close: entry['c'],
            no_trading: false
          )
        end
      end
    else
      raise "Failed to fetch data from API"
    end
  end

  def aggregate_data(ticker_data)
    closing_prices = ticker_data.where(no_trading: false).pluck(:close)

    if closing_prices.any?
      {
        max: closing_prices.max,
        min: closing_prices.min,
        average: (closing_prices.sum / closing_prices.size.to_f).round(2)
      }
    else
      {
        max: 0,
        min: 0,
        average: 0
      }
    end
  end
end
