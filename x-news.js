window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T08:36:03.158Z",
  "items": [
    {
      "time": "16:33",
      "title": "九州自動車道 14日朝に全線復旧",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591591?source=rss",
      "publishedAt": "2026-08-13T07:33:24.000Z",
      "xQuery": "九州自動車道 14日朝に全線復旧"
    },
    {
      "time": "17:28",
      "title": "露大統領の択捉島訪問 高市氏抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591598?source=rss",
      "publishedAt": "2026-08-13T08:28:30.000Z",
      "xQuery": "露大統領の択捉島訪問 高市氏抗議"
    },
    {
      "time": "17:08",
      "title": "関東で激しい雨 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591594?source=rss",
      "publishedAt": "2026-08-13T08:08:37.000Z",
      "xQuery": "関東で激しい雨 現地のSNS投稿"
    },
    {
      "time": "16:40",
      "title": "無人の農業運搬車にひかれ 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591587?source=rss",
      "publishedAt": "2026-08-13T07:40:21.000Z",
      "xQuery": "無人の農業運搬車にひかれ 死亡"
    },
    {
      "time": "16:38",
      "title": "そごう 19年ぶり「本店」名称復活",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591590?source=rss",
      "publishedAt": "2026-08-13T07:38:03.000Z",
      "xQuery": "そごう 19年ぶり「本店」名称復活"
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
