window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T10:05:27.810Z",
  "items": [
    {
      "time": "17:52",
      "title": "7月上旬は北日本や北陸で高温予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586126?source=rss",
      "publishedAt": "2026-06-29T08:52:13.000Z",
      "xQuery": "7月上旬は北日本や北陸で高温予想"
    },
    {
      "time": "16:56",
      "title": "車両「くの字」脱線受け近鉄謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586116?source=rss",
      "publishedAt": "2026-06-29T07:56:07.000Z",
      "xQuery": "車両「くの字」脱線受け近鉄謝罪"
    },
    {
      "time": "18:04",
      "title": "八甲田山中で遺体 クマが襲ったか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586127?source=rss",
      "publishedAt": "2026-06-29T09:04:15.000Z",
      "xQuery": "八甲田山中で遺体 クマが襲ったか"
    },
    {
      "time": "18:51",
      "title": "連日の職員逮捕 前橋市長がおわび",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586132?source=rss",
      "publishedAt": "2026-06-29T09:51:06.000Z",
      "xQuery": "連日の職員逮捕 前橋市長がおわび"
    },
    {
      "time": "18:29",
      "title": "高校生を発見 海でおぼれ行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586131?source=rss",
      "publishedAt": "2026-06-29T09:29:55.000Z",
      "xQuery": "高校生を発見 海でおぼれ行方不明"
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
