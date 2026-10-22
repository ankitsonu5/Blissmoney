const fs = require('fs');

const thematicHtml = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/85be64e1-2838-4ede-90f2-a6216403e62a/.system_generated/steps/287/content.md', 'utf8');
const match = thematicHtml.match(/<div class="info">\s*<p class="">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="social-media-share">/);
const thematicBody = match ? match[1] : '';

const art1 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/85be64e1-2838-4ede-90f2-a6216403e62a/scratch/article_1.html', 'utf8');
const art2 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/85be64e1-2838-4ede-90f2-a6216403e62a/scratch/article_2.html', 'utf8');
const art3 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/85be64e1-2838-4ede-90f2-a6216403e62a/scratch/article_3.html', 'utf8');
const art4 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/85be64e1-2838-4ede-90f2-a6216403e62a/scratch/article_4.html', 'utf8');
const art6 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/85be64e1-2838-4ede-90f2-a6216403e62a/scratch/article_5.html', 'utf8');

const articles = [
  {
    id: 1,
    file: 'blog-weekly-market-briefing.html',
    slug: 'blissmoney-weekly-market-briefing-22-26-june-2026',
    title: 'BlissMoney Weekly Market Briefing: 22–26 June 2026',
    date: 'June 26, 2026',
    category: 'Market Insights',
    readTime: '6 min read',
    image: 'assets/images/blogs/blog_1.png',
    fallbackImage: 'https://www.blissmoney.in/img/640007440.png',
    excerpt: 'Weekly market wrap covering crude oil easing, benchmark rallies, FII/DII institutional flows, sectoral shifts, and portfolio allocation recommendations.',
    content: art1
  },
  {
    id: 2,
    file: 'blog-market-wrap-5-may.html',
    slug: 'market-wrap-up-5-may-2026-indian-markets-close-lower',
    title: 'Market Wrap-Up | 5 May 2026: Indian Markets Close Lower Amid Global Uncertainty',
    date: 'May 5, 2026',
    category: 'Daily Wrap',
    readTime: '4 min read',
    image: 'assets/images/blogs/blog_2.png',
    fallbackImage: 'https://www.blissmoney.in/img/274006207.png',
    excerpt: 'Indian benchmark indices closed lower amid heightened geopolitical tensions in the Middle East and rising crude oil volatility. Key sectoral highlights and outlook.',
    content: art2
  },
  {
    id: 3,
    file: 'blog-market-wrap-15-april.html',
    slug: 'market-wrap-up-april-15-2026-nifty-up-1-63-percent',
    title: 'Market Wrap-Up April 15, 2026: Nifty Up 1.63% on US-Iran Hopes',
    date: 'April 15, 2026',
    category: 'Market Wrap',
    readTime: '4 min read',
    image: 'assets/images/blogs/blog_3.png',
    fallbackImage: 'https://www.blissmoney.in/img/133003125.png',
    excerpt: 'Nifty and Sensex staged a massive relief rally, jumping over 1.6% as geopolitical de-escalation hopes eased oil prices and spurred broad-based equity buying.',
    content: art3
  },
  {
    id: 4,
    file: 'blog-us-economy.html',
    slug: 'the-state-of-the-us-economy-in-april-2026',
    title: 'The State of the US Economy in April 2026: Resilient Growth Amid Global Challenges',
    date: 'April 10, 2026',
    category: 'Global Macro',
    readTime: '5 min read',
    image: 'assets/images/blogs/blog_4.jpeg',
    fallbackImage: 'https://www.blissmoney.in/img/188004642.jpeg',
    excerpt: 'An in-depth macroeconomic analysis of the US economy entering Q2 2026 - labor market resilience, Federal Reserve rate paths, inflation dynamics, and global spillover.',
    content: art4
  },
  {
    id: 5,
    file: 'blog-thematic-mutual-funds.html',
    slug: 'thematic-mutual-funds-meaning-types-benefits-and-strategy',
    title: 'Thematic Mutual Funds: Meaning, Types, Benefits and Investment Strategy',
    date: 'April 4, 2026',
    category: 'Mutual Funds',
    readTime: '7 min read',
    image: 'assets/images/blogs/blog_5.jpeg',
    fallbackImage: 'https://www.blissmoney.in/img/372009756.jpeg',
    excerpt: 'Complete guide to thematic mutual funds in India: key characteristics, major structural themes (tech, infra, energy transition), sector funds vs thematic funds, and portfolio allocation rules.',
    content: thematicBody
  },
  {
    id: 6,
    file: 'blog-sebi-mutual-fund-rules.html',
    slug: 'sebi-new-equity-mutual-fund-classification-rules-2026',
    title: 'SEBI New Equity Mutual Fund Classification Rules 2026: What Has Changed',
    date: 'March 28, 2026',
    category: 'Regulations',
    readTime: '5 min read',
    image: 'assets/images/blogs/blog_6.jpeg',
    fallbackImage: 'https://www.blissmoney.in/img/473008422.jpeg',
    excerpt: 'Understanding SEBI new categorisation and rationalisation circular for equity mutual fund schemes - what changes for multi-cap, large-cap, and thematic funds, and what investors must do.',
    content: art6
  }
];

const jsContent = '/** BlissMoney Blog Database **/\nwindow.BLISSMONEY_BLOGS = ' + JSON.stringify(articles, null, 2) + ';\n';
fs.writeFileSync('assets/js/blogs-data.js', jsContent, 'utf8');
console.log('Successfully written assets/js/blogs-data.js! Count:', articles.length);
