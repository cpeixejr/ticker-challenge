class CreateTickerData < ActiveRecord::Migration[8.0]
  def change
    create_table :ticker_data do |t|
      t.date :date, index: true
      t.decimal :close
      t.string :ticker, index: true
      t.boolean :no_trading, null: false, default: false

      t.timestamps
    end
  end
end
