window.LUS_X_NEWS = {
  "updatedAt": "2026-11-07T12:35:03.591Z",
  "items": [
    {
      "time": "19:03",
      "title": "8日朝 東京など冷え込み今季一番",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601681?source=rss",
      "publishedAt": "2026-11-07T10:03:12.000Z",
      "xQuery": "8日朝 東京など冷え込み今季一番"
    },
    {
      "time": "18:29",
      "title": "ソマリア海賊問題が再燃 今年15件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601675?source=rss",
      "publishedAt": "2026-11-07T09:29:01.000Z",
      "xQuery": "ソマリア海賊問題が再燃 今年15件"
    },
    {
      "time": "20:51",
      "title": "中国拘束の邦人 満期服役で出所へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601692?source=rss",
      "publishedAt": "2026-11-07T11:51:20.000Z",
      "xQuery": "中国拘束の邦人 満期服役で出所へ"
    },
    {
      "time": "21:10",
      "title": "ダイビング中の70代女性 行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601693?source=rss",
      "publishedAt": "2026-11-07T12:10:47.000Z",
      "xQuery": "ダイビング中の70代女性 行方不明"
    },
    {
      "time": "16:52",
      "title": "銭湯の混浴制限 悩む親たちの本音",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601661?source=rss",
      "publishedAt": "2026-11-07T07:52:34.000Z",
      "xQuery": "銭湯の混浴制限 悩む親たちの本音"
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
