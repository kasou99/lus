window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T06:39:19.219Z",
  "items": [
    {
      "time": "09:29",
      "title": "地方銀行再編 各地でくすぶる火種",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603509?source=rss",
      "publishedAt": "2026-11-22T00:29:41.000Z",
      "xQuery": "地方銀行再編 各地でくすぶる火種"
    },
    {
      "time": "14:12",
      "title": "韓国 教育相が入試巡る混乱で辞意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603542?source=rss",
      "publishedAt": "2026-11-22T05:12:21.000Z",
      "xQuery": "韓国 教育相が入試巡る混乱で辞意"
    },
    {
      "time": "14:46",
      "title": "原発敷地でガラスの下敷きに 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603547?source=rss",
      "publishedAt": "2026-11-22T05:46:39.000Z",
      "xQuery": "原発敷地でガラスの下敷きに 重体"
    },
    {
      "time": "14:33",
      "title": "12歳男子中学生が行方不明 郡山市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603546?source=rss",
      "publishedAt": "2026-11-22T05:33:04.000Z",
      "xQuery": "12歳男子中学生が行方不明 郡山市"
    },
    {
      "time": "15:18",
      "title": "裸足で24h走り続ける大会なぜ参加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603551?source=rss",
      "publishedAt": "2026-11-22T06:18:14.000Z",
      "xQuery": "裸足で24h走り続ける大会なぜ参加"
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
