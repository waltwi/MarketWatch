/** Preset equities and Finnhub-style crypto symbols for signup preferences. */
export const STOCK_CHOICES = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'AMD', name: 'AMD' },
]

export const CRYPTO_CHOICES = [
  { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
  { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
  { symbol: 'BINANCE:SOLUSDT', name: 'Solana' },
  { symbol: 'BINANCE:ADAUSDT', name: 'Cardano' },
  { symbol: 'BINANCE:XRPUSDT', name: 'XRP' },
  { symbol: 'BINANCE:DOGEUSDT', name: 'Dogecoin' },
]

export const DEFAULT_STOCKS = ['AAPL', 'MSFT', 'NVDA']
export const DEFAULT_CRYPTO = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT']

export function shortCryptoLabel(symbol) {
  if (!symbol || !symbol.includes(':')) return symbol
  const tail = symbol.split(':')[1] || symbol
  return tail.replace(/USDT$/i, '')
}
