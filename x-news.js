window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T08:20:48.681Z",
  "items": [
    {
      "time": "16:28",
      "title": "飲食料品の消費税率1% 閣議決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590619?source=rss",
      "publishedAt": "2026-08-05T07:28:39.000Z",
      "xQuery": "飲食料品の消費税率1% 閣議決定"
    },
    {
      "time": "17:09",
      "title": "花火文化に危機感 希望の取り組み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590620?source=rss",
      "publishedAt": "2026-08-05T08:09:13.000Z",
      "xQuery": "花火文化に危機感 希望の取り組み"
    },
    {
      "time": "15:31",
      "title": "日本製紙会見 社長「深くおわび」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590614?source=rss",
      "publishedAt": "2026-08-05T06:31:01.000Z",
      "xQuery": "日本製紙会見 社長「深くおわび」"
    },
    {
      "time": "16:00",
      "title": "公園の集団礼拝を市認めず 適切か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590617?source=rss",
      "publishedAt": "2026-08-05T07:00:42.000Z",
      "xQuery": "公園の集団礼拝を市認めず 適切か"
    },
    {
      "time": "16:28",
      "title": "出演者から性被害 NHK職員が休職",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590618?source=rss",
      "publishedAt": "2026-08-05T07:28:39.000Z",
      "xQuery": "出演者から性被害 NHK職員が休職"
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
