window.LUS_X_NEWS = {
  "updatedAt": "2026-11-08T23:09:10.608Z",
  "items": [
    {
      "time": "06:44",
      "title": "9日 関東-北海道で師走並みの寒さ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601858?source=rss",
      "publishedAt": "2026-11-08T21:44:30.000Z",
      "xQuery": "9日 関東-北海道で師走並みの寒さ"
    },
    {
      "time": "07:21",
      "title": "エジプトで列車同士衝突 7人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601860?source=rss",
      "publishedAt": "2026-11-08T22:21:56.000Z",
      "xQuery": "エジプトで列車同士衝突 7人死亡"
    },
    {
      "time": "07:31",
      "title": "パラグライダー 初心者イベで墜落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601861?source=rss",
      "publishedAt": "2026-11-08T22:31:11.000Z",
      "xQuery": "パラグライダー 初心者イベで墜落"
    },
    {
      "time": "07:46",
      "title": "舎人ライナー 資金不足陥る可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601864?source=rss",
      "publishedAt": "2026-11-08T22:46:35.000Z",
      "xQuery": "舎人ライナー 資金不足陥る可能性"
    },
    {
      "time": "06:32",
      "title": "迷惑行為ショウリンジ SNS模倣か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601857?source=rss",
      "publishedAt": "2026-11-08T21:32:55.000Z",
      "xQuery": "迷惑行為ショウリンジ SNS模倣か"
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
