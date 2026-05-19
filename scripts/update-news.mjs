import { writeFile } from "node:fs/promises";

const google = (query) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ja&gl=JP&ceid=JP:ja`;

const feeds = {
  machineHeadlines: [
    google('工作機械 OR NC旋盤 OR マシニングセンタ OR 設備保全 OR 制御盤 OR サーボモータ when:1d'),
    'https://news.yahoo.co.jp/rss/topics/business.xml'
  ],
  worldHeadlines: [
    'https://news.yahoo.co.jp/rss/topics/world.xml',
    google('世界情勢 製造業 サプライチェーン 半導体 物流 エネルギー when:1d')
  ],
  economyHeadlines: [
    'https://news.yahoo.co.jp/rss/topics/business.xml',
    google('製造業 景況感 設備投資 円相場 金利 中小企業 when:1d')
  ],
  localHeadlines: [
    'https://news.yahoo.co.jp/rss/topics/local.xml',
    google('福山市 広島県 岡山県 製造業 工場 設備 交通 経済 when:7d')
  ],
  subsidyHeadlines: [
    google('福山市 広島県 補助金 助成金 中小企業 設備投資 省力化 ものづくり when:30d')
  ]
};

const fixedSubsidies = [
  {
    time: '5/15',
    title: '2026年度 事業者向け創エネ・蓄エネ・省エネ設備導入等補助金交付事業について',
    source: '福山市',
    url: 'https://www.city.fukuyama.hiroshima.jp/site/kankyo/394078.html'
  },
  {
    time: '3/2',
    title: 'グリーンな企業賃上げ環境整備支援事業補助金について',
    source: '福山市',
    url: 'https://www.city.fukuyama.hiroshima.jp/soshiki/sangyou/391140.html'
  },
  {
    time: '4/3',
    title: '広島県 中小企業省エネ設備等導入支援補助金について',
    source: '広島県',
    url: 'https://www.pref.hiroshima.lg.jp/site/eco/shoenehojokin-r8.html'
  },
  {
    time: '確認',
    title: '中小企業省力化投資補助金の公募・採択情報を確認',
    source: '中小機構',
    url: 'https://seisansei.smrj.go.jp/subsidy_info/laborsaving_subsidy.html'
  }
];

const fallback = {
  machineHeadlines: [
    item('確認', '工作機械・NC旋盤・マシニングセンタの最新ニュースを確認', 'Googleニュース', google('工作機械 when:1d')),
    item('確認', '設備保全・制御盤・サーボモータの最新ニュースを確認', 'Googleニュース', google('設備保全 制御盤 サーボモータ when:1d'))
  ],
  worldHeadlines: [item('確認', '世界情勢・製造業サプライチェーンの最新ニュースを確認', 'Googleニュース', google('世界情勢 製造業 サプライチェーン when:1d'))],
  economyHeadlines: [item('確認', '製造業・為替・金利・設備投資の最新ニュースを確認', 'Googleニュース', google('製造業 為替 金利 設備投資 when:1d'))],
  localHeadlines: [item('確認', '福山市・広島岡山の製造業と地域経済ニュースを確認', 'Googleニュース', google('福山市 広島 岡山 製造業 when:1d'))],
  subsidyHeadlines: fixedSubsidies
};

function item(time, title, source, url) {
  return { time, title, source, url };
}

function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim();
}

function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return decodeXml(match?.[1] || '');
}

function sourceFromItem(xml, url) {
  const source = tag(xml, 'source');
  if (source) return source;
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host.includes('yahoo')) return 'Yahoo!ニュース';
    if (host.includes('news.google')) return 'Googleニュース';
    return host;
  } catch {
    return 'ニュース';
  }
}

function cleanTitle(title) {
  return decodeXml(title)
    .replace(/\s+-\s+Yahoo!ニュース$/u, '')
    .replace(/\s+-\s+[^-｜|]{2,30}$/u, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatTime(pubDate) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return '速報';
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function parseRss(xml) {
  const matches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return matches.map((entry) => {
    const title = cleanTitle(tag(entry, 'title'));
    const url = tag(entry, 'link');
    const pubDate = tag(entry, 'pubDate');
    return {
      time: formatTime(pubDate),
      title,
      source: sourceFromItem(entry, url),
      url,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : ''
    };
  }).filter((entry) => entry.title && entry.url);
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'LUS Repair Base headline updater/1.0'
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return parseRss(await response.text());
}

function dedupe(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = entry.title.replace(/[\s　]/g, '').slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function buildGroup(name) {
  const settled = await Promise.allSettled(feeds[name].map(fetchFeed));
  const entries = settled.flatMap((result) => result.status === 'fulfilled' ? result.value : []);
  const merged = dedupe(name === 'subsidyHeadlines' ? [...fixedSubsidies, ...entries] : entries);
  return merged.length ? merged.slice(0, name === 'machineHeadlines' ? 8 : 6) : fallback[name];
}

const groups = Object.fromEntries(
  await Promise.all(Object.keys(feeds).map(async (name) => [name, await buildGroup(name)]))
);

await writeFile('news.json', `${JSON.stringify({ updatedAt: new Date().toISOString(), groups }, null, 2)}\n`, 'utf8');
