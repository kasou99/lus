window.LUS_X_NEWS = {
  "updatedAt": "2026-10-01T12:54:38.413Z",
  "items": [
    {
      "time": "20:54",
      "title": "青森秋田岩手の3銀行 統合協議へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597211?source=rss",
      "publishedAt": "2026-10-01T11:54:52.000Z",
      "xQuery": "青森秋田岩手の3銀行 統合協議へ"
    },
    {
      "time": "20:19",
      "title": "統一地方選 4月11・25日投票へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597206?source=rss",
      "publishedAt": "2026-10-01T11:19:26.000Z",
      "xQuery": "統一地方選 4月11・25日投票へ"
    },
    {
      "time": "20:37",
      "title": "無許可でモスク建設 市が撤去命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597207?source=rss",
      "publishedAt": "2026-10-01T11:37:03.000Z",
      "xQuery": "無許可でモスク建設 市が撤去命令"
    },
    {
      "time": "20:31",
      "title": "滋賀の工場で爆発 男性の遺体発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597208?source=rss",
      "publishedAt": "2026-10-01T11:31:37.000Z",
      "xQuery": "滋賀の工場で爆発 男性の遺体発見"
    },
    {
      "time": "21:24",
      "title": "マックのドナルド 「ロナルド」に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597212?source=rss",
      "publishedAt": "2026-10-01T12:24:25.000Z",
      "xQuery": "マックのドナルド 「ロナルド」に"
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
