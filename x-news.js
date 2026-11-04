window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T00:29:15.131Z",
  "items": [
    {
      "time": "08:28",
      "title": "アメリカ中間選挙の開票始まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601254?source=rss",
      "publishedAt": "2026-11-03T23:28:24.000Z",
      "xQuery": "アメリカ中間選挙の開票始まる"
    },
    {
      "time": "08:11",
      "title": "米中間選挙 予測市場が試練に直面",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601252?source=rss",
      "publishedAt": "2026-11-03T23:11:46.000Z",
      "xQuery": "米中間選挙 予測市場が試練に直面"
    },
    {
      "time": "09:15",
      "title": "米 イスラエル年40億ドル支援終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601259?source=rss",
      "publishedAt": "2026-11-04T00:15:58.000Z",
      "xQuery": "米 イスラエル年40億ドル支援終了"
    },
    {
      "time": "08:23",
      "title": "関東一部 5日朝に警報級大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601253?source=rss",
      "publishedAt": "2026-11-03T23:23:21.000Z",
      "xQuery": "関東一部 5日朝に警報級大雨恐れ"
    },
    {
      "time": "08:16",
      "title": "パーソナルトレ トラブル急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601250?source=rss",
      "publishedAt": "2026-11-03T23:16:44.000Z",
      "xQuery": "パーソナルトレ トラブル急増"
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
