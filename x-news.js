window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T23:22:02.796Z",
  "items": [
    {
      "time": "07:38",
      "title": "九州 40℃に迫る危険な暑さ予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587616?source=rss",
      "publishedAt": "2026-07-11T22:38:57.000Z",
      "xQuery": "九州 40℃に迫る危険な暑さ予想"
    },
    {
      "time": "08:05",
      "title": "特別国会 与野党が最終盤の攻防へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587618?source=rss",
      "publishedAt": "2026-07-11T23:05:59.000Z",
      "xQuery": "特別国会 与野党が最終盤の攻防へ"
    },
    {
      "time": "07:47",
      "title": "高波で船が転覆か 1人行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587617?source=rss",
      "publishedAt": "2026-07-11T22:47:25.000Z",
      "xQuery": "高波で船が転覆か 1人行方不明"
    },
    {
      "time": "07:34",
      "title": "マンションで女性殺害疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587615?source=rss",
      "publishedAt": "2026-07-11T22:34:45.000Z",
      "xQuery": "マンションで女性殺害疑い 男逮捕"
    },
    {
      "time": "23:00",
      "title": "1日千人使うバス廃止へ 住民困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587607?source=rss",
      "publishedAt": "2026-07-11T14:00:35.000Z",
      "xQuery": "1日千人使うバス廃止へ 住民困惑"
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
