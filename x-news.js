window.LUS_X_NEWS = {
  "updatedAt": "2026-10-16T02:23:46.887Z",
  "items": [
    {
      "time": "11:06",
      "title": "全国初 罰則付きカスハラ条例可決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598960?source=rss",
      "publishedAt": "2026-10-16T02:06:14.000Z",
      "xQuery": "全国初 罰則付きカスハラ条例可決"
    },
    {
      "time": "08:57",
      "title": "フーシ イエメンの大統領宮殿攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598950?source=rss",
      "publishedAt": "2026-10-15T23:57:52.000Z",
      "xQuery": "フーシ イエメンの大統領宮殿攻撃"
    },
    {
      "time": "11:13",
      "title": "米小学校で銃撃 16歳の容疑者死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598962?source=rss",
      "publishedAt": "2026-10-16T02:13:11.000Z",
      "xQuery": "米小学校で銃撃 16歳の容疑者死亡"
    },
    {
      "time": "09:23",
      "title": "有罪か無罪か 王将射殺きょう判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598954?source=rss",
      "publishedAt": "2026-10-16T00:23:13.000Z",
      "xQuery": "有罪か無罪か 王将射殺きょう判決"
    },
    {
      "time": "10:06",
      "title": "看護師撮影の動画流出 なぜX拡散",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598956?source=rss",
      "publishedAt": "2026-10-16T01:06:45.000Z",
      "xQuery": "看護師撮影の動画流出 なぜX拡散"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
