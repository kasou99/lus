window.LUS_X_NEWS = {
  "updatedAt": "2026-08-21T04:17:44.653Z",
  "items": [
    {
      "time": "12:13",
      "title": "中立公「月内の3党合流」に暗雲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592513?source=rss",
      "publishedAt": "2026-08-21T03:13:41.000Z",
      "xQuery": "中立公「月内の3党合流」に暗雲"
    },
    {
      "time": "12:06",
      "title": "秋サケ激減の異常事態 転換した漁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592517?source=rss",
      "publishedAt": "2026-08-21T03:06:54.000Z",
      "xQuery": "秋サケ激減の異常事態 転換した漁"
    },
    {
      "time": "12:26",
      "title": "農場で外国籍従業員に暴力か 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592519?source=rss",
      "publishedAt": "2026-08-21T03:26:18.000Z",
      "xQuery": "農場で外国籍従業員に暴力か 調査"
    },
    {
      "time": "10:34",
      "title": "4人死亡 時速50kmで駅構内進入か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592502?source=rss",
      "publishedAt": "2026-08-21T01:34:27.000Z",
      "xQuery": "4人死亡 時速50kmで駅構内進入か"
    },
    {
      "time": "12:00",
      "title": "botで大量クリック 広告費を詐取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592510?source=rss",
      "publishedAt": "2026-08-21T03:00:00.000Z",
      "xQuery": "botで大量クリック 広告費を詐取"
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
