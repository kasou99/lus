window.LUS_X_NEWS = {
  "updatedAt": "2026-07-27T13:28:42.546Z",
  "items": [
    {
      "time": "21:31",
      "title": "外国の不当干渉に刑罰 自民提言へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589547?source=rss",
      "publishedAt": "2026-07-27T12:31:29.000Z",
      "xQuery": "外国の不当干渉に刑罰 自民提言へ"
    },
    {
      "time": "21:45",
      "title": "辺野古 遺族が校長や団体側を告訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589549?source=rss",
      "publishedAt": "2026-07-27T12:45:04.000Z",
      "xQuery": "辺野古 遺族が校長や団体側を告訴"
    },
    {
      "time": "21:00",
      "title": "5歳遺体発見 父が語る最後の対面",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589542?source=rss",
      "publishedAt": "2026-07-27T12:00:55.000Z",
      "xQuery": "5歳遺体発見 父が語る最後の対面"
    },
    {
      "time": "21:47",
      "title": "園経営者が園児に塩 保育士ら会見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589546?source=rss",
      "publishedAt": "2026-07-27T12:47:01.000Z",
      "xQuery": "園経営者が園児に塩 保育士ら会見"
    },
    {
      "time": "22:14",
      "title": "静岡県の偽サイト発見 今年4件目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589550?source=rss",
      "publishedAt": "2026-07-27T13:14:28.000Z",
      "xQuery": "静岡県の偽サイト発見 今年4件目"
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
