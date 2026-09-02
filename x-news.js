window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T10:19:36.419Z",
  "items": [
    {
      "time": "16:55",
      "title": "日本郵便に勧告 フリーランス巡り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593989?source=rss",
      "publishedAt": "2026-09-02T07:55:06.000Z",
      "xQuery": "日本郵便に勧告 フリーランス巡り"
    },
    {
      "time": "17:54",
      "title": "きえないで 新学期に水族館が投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593999?source=rss",
      "publishedAt": "2026-09-02T08:54:40.000Z",
      "xQuery": "きえないで 新学期に水族館が投稿"
    },
    {
      "time": "16:32",
      "title": "あべちか強殺未遂事件 男公開手配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593986?source=rss",
      "publishedAt": "2026-09-02T07:32:39.000Z",
      "xQuery": "あべちか強殺未遂事件 男公開手配"
    },
    {
      "time": "18:10",
      "title": "子の余命 他人から告げられ苦痛も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594001?source=rss",
      "publishedAt": "2026-09-02T09:10:57.000Z",
      "xQuery": "子の余命 他人から告げられ苦痛も"
    },
    {
      "time": "16:47",
      "title": "「美人局」疑い 高校生ら5人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593988?source=rss",
      "publishedAt": "2026-09-02T07:47:03.000Z",
      "xQuery": "「美人局」疑い 高校生ら5人逮捕"
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
