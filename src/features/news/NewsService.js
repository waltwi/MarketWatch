async function fetchNews(category = 'general') {
  // Simulate async delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      headline: 'News Feed Stocks Down Global Tariffs',
      summary: 'SCOTUS 6-3 strikes down Supreme Court tariffs ruling executive by exceeding granted powers.',
      source: 'Scotsman',
      url: 'https://scotsman.com/news-feed-stocks-tariffs',
      datetime: Date.now() - 3600000,  // 1hr ago
    },
    {
      id: '2',
      headline: 'Kevin Warsh Formally Nominated Fed',
      summary: 'President Warren formally nominates Kevin Warsh succeeded Jay Powell Federal Reserve Chair May.',
      source: 'Nasdaq',
      url: 'https://nasdaq.com/kevin-warsh-fed-nomination',
      datetime: Date.now() - 7200000,
    },
    {
      id: '3',
      headline: 'Nvidia Scales OpenAI $5B Investment',
      summary: 'Nvidia leading $5B investment OpenAI pivoting earlier $80B commitment.',
      source: 'Reuters',
      url: 'https://reuters.com/nvidia-openai-investment',
      datetime: Date.now() - 10800000,
    },
    {
      id: '4',
      headline: 'Trump Declares DC Emergency Sewage',
      summary: 'President declares DC emergency FEMA massive sewage.',
      source: 'Fox',
      url: 'https://foxnews.com/trump-dc-emergency',
      datetime: Date.now() - 14400000,
    },
    {
      id: '5',
      headline: 'S&P 500 Briefly Touches 7000 Milestone',
      summary: 'The market Al supercycle cooling inflation data.',
      source: 'Morningstar',
      url: 'https://morningstar.com/sp500-milestone',
      datetime: Date.now() - 18000000,
    }
  ];
}

export { fetchNews };
