window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T08:42:35.903Z",
  "items": [
    {
      "time": "16:31",
      "title": "中道改革連合「分裂」正式に決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594759?source=rss",
      "publishedAt": "2026-09-09T07:31:40.000Z",
      "xQuery": "中道改革連合「分裂」正式に決定"
    },
    {
      "time": "15:18",
      "title": "東北〜近畿で大雨 災害に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594749?source=rss",
      "publishedAt": "2026-09-09T06:18:51.000Z",
      "xQuery": "東北〜近畿で大雨 災害に厳重警戒"
    },
    {
      "time": "17:19",
      "title": "男児が海に流され行方不明 神奈川",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594763?source=rss",
      "publishedAt": "2026-09-09T08:19:02.000Z",
      "xQuery": "男児が海に流され行方不明 神奈川"
    },
    {
      "time": "16:41",
      "title": "日本国旗を押し売りか 全国各地で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594752?source=rss",
      "publishedAt": "2026-09-09T07:41:27.000Z",
      "xQuery": "日本国旗を押し売りか 全国各地で"
    },
    {
      "time": "16:02",
      "title": "コメ農家の廃業 過去最多ペース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594753?source=rss",
      "publishedAt": "2026-09-09T07:02:53.000Z",
      "xQuery": "コメ農家の廃業 過去最多ペース"
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
