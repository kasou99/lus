window.LUS_X_NEWS = {
  "updatedAt": "2026-08-29T04:18:27.125Z",
  "items": [
    {
      "time": "12:11",
      "title": "北陸など警報級大雨恐れ 災害警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593495?source=rss",
      "publishedAt": "2026-08-29T03:11:05.000Z",
      "xQuery": "北陸など警報級大雨恐れ 災害警戒"
    },
    {
      "time": "12:59",
      "title": "円が下落 介入効果4週間で陰り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593500?source=rss",
      "publishedAt": "2026-08-29T03:59:26.000Z",
      "xQuery": "円が下落 介入効果4週間で陰り"
    },
    {
      "time": "12:31",
      "title": "海で不明の中高生か 2人心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593499?source=rss",
      "publishedAt": "2026-08-29T03:31:36.000Z",
      "xQuery": "海で不明の中高生か 2人心肺停止"
    },
    {
      "time": "12:05",
      "title": "長女が重体 傷害の疑いで両親逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593493?source=rss",
      "publishedAt": "2026-08-29T03:05:41.000Z",
      "xQuery": "長女が重体 傷害の疑いで両親逮捕"
    },
    {
      "time": "10:47",
      "title": "17年で社長が7人 百貨店消滅の街",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593483?source=rss",
      "publishedAt": "2026-08-29T01:47:37.000Z",
      "xQuery": "17年で社長が7人 百貨店消滅の街"
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
