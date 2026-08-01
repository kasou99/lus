window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T13:34:33.654Z",
  "items": [
    {
      "time": "21:56",
      "title": "熊本で最大震度5弱 津波心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590191?source=rss",
      "publishedAt": "2026-08-01T12:56:00.000Z",
      "xQuery": "熊本で最大震度5弱 津波心配なし"
    },
    {
      "time": "21:47",
      "title": "猛暑日予想 週明け熊本は40℃恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590190?source=rss",
      "publishedAt": "2026-08-01T12:47:46.000Z",
      "xQuery": "猛暑日予想 週明け熊本は40℃恐れ"
    },
    {
      "time": "19:31",
      "title": "避難者2200人規模受け入れへ 調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590181?source=rss",
      "publishedAt": "2026-08-01T10:31:28.000Z",
      "xQuery": "避難者2200人規模受け入れへ 調整"
    },
    {
      "time": "21:22",
      "title": "石破氏 財源示さない減税は無責任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590189?source=rss",
      "publishedAt": "2026-08-01T12:22:42.000Z",
      "xQuery": "石破氏 財源示さない減税は無責任"
    },
    {
      "time": "19:49",
      "title": "2歳が行方不明 祖母の家に帰省中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590182?source=rss",
      "publishedAt": "2026-08-01T10:49:40.000Z",
      "xQuery": "2歳が行方不明 祖母の家に帰省中"
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
