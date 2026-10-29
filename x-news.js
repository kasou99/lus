window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T09:36:04.255Z",
  "items": [
    {
      "time": "18:21",
      "title": "滋賀銀・池田泉州HD 統合へ合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600584?source=rss",
      "publishedAt": "2026-10-29T09:21:04.000Z",
      "xQuery": "滋賀銀・池田泉州HD 統合へ合意"
    },
    {
      "time": "16:47",
      "title": "首都圏強盗 実行役2人に無期求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600564?source=rss",
      "publishedAt": "2026-10-29T07:47:50.000Z",
      "xQuery": "首都圏強盗 実行役2人に無期求刑"
    },
    {
      "time": "17:20",
      "title": "スペイン事故 邦人2人連絡つかず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600571?source=rss",
      "publishedAt": "2026-10-29T08:20:14.000Z",
      "xQuery": "スペイン事故 邦人2人連絡つかず"
    },
    {
      "time": "16:58",
      "title": "韓国・尹前大統領に再び死刑求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600566?source=rss",
      "publishedAt": "2026-10-29T07:58:28.000Z",
      "xQuery": "韓国・尹前大統領に再び死刑求刑"
    },
    {
      "time": "18:04",
      "title": "韓国で日本人女性殺害疑い 男拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600577?source=rss",
      "publishedAt": "2026-10-29T09:04:28.000Z",
      "xQuery": "韓国で日本人女性殺害疑い 男拘束"
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
