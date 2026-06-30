window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T12:53:16.520Z",
  "items": [
    {
      "time": "20:02",
      "title": "航空宇宙自衛隊 略称「空自」維持",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586265?source=rss",
      "publishedAt": "2026-06-30T11:02:50.000Z",
      "xQuery": "航空宇宙自衛隊 略称「空自」維持"
    },
    {
      "time": "21:00",
      "title": "5歳児不明 10日目も手がかりなし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586269?source=rss",
      "publishedAt": "2026-06-30T12:00:14.000Z",
      "xQuery": "5歳児不明 10日目も手がかりなし"
    },
    {
      "time": "18:35",
      "title": "33歳のとき夫突然死 喪失感に苦悩",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586256?source=rss",
      "publishedAt": "2026-06-30T09:35:39.000Z",
      "xQuery": "33歳のとき夫突然死 喪失感に苦悩"
    },
    {
      "time": "20:59",
      "title": "韓国政府 サッカー協会特別監査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586267?source=rss",
      "publishedAt": "2026-06-30T11:59:28.000Z",
      "xQuery": "韓国政府 サッカー協会特別監査へ"
    },
    {
      "time": "20:07",
      "title": "大丸下関店 来年8月末で営業終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586264?source=rss",
      "publishedAt": "2026-06-30T11:07:52.000Z",
      "xQuery": "大丸下関店 来年8月末で営業終了"
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
