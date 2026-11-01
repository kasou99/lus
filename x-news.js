window.LUS_X_NEWS = {
  "updatedAt": "2026-11-01T02:16:08.201Z",
  "items": [
    {
      "time": "08:34",
      "title": "中国 台湾周辺海底ケーブル探査か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600895?source=rss",
      "publishedAt": "2026-10-31T23:34:33.000Z",
      "xQuery": "中国 台湾周辺海底ケーブル探査か"
    },
    {
      "time": "09:56",
      "title": "バイナンス被害 北朝鮮関与とFBI",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600906?source=rss",
      "publishedAt": "2026-11-01T00:56:58.000Z",
      "xQuery": "バイナンス被害 北朝鮮関与とFBI"
    },
    {
      "time": "09:58",
      "title": "共和党 トランプ氏から離反相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600904?source=rss",
      "publishedAt": "2026-11-01T00:58:11.000Z",
      "xQuery": "共和党 トランプ氏から離反相次ぐ"
    },
    {
      "time": "11:00",
      "title": "福岡市長選 政令市最多13人立候補",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600918?source=rss",
      "publishedAt": "2026-11-01T02:00:42.000Z",
      "xQuery": "福岡市長選 政令市最多13人立候補"
    },
    {
      "time": "11:12",
      "title": "長すぎベルト「落ち感」引き出す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600919?source=rss",
      "publishedAt": "2026-11-01T02:12:42.000Z",
      "xQuery": "長すぎベルト「落ち感」引き出す"
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
