window.LUS_X_NEWS = {
  "updatedAt": "2026-07-17T06:57:45.330Z",
  "items": [
    {
      "time": "15:49",
      "title": "日経終値2694円安 5番目の下げ幅",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588276?source=rss",
      "publishedAt": "2026-07-17T06:49:54.000Z",
      "xQuery": "日経終値2694円安 5番目の下げ幅"
    },
    {
      "time": "15:47",
      "title": "政府与党 25日まで国会延長を調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588271?source=rss",
      "publishedAt": "2026-07-17T06:47:56.000Z",
      "xQuery": "政府与党 25日まで国会延長を調整"
    },
    {
      "time": "10:31",
      "title": "女性2人承諾殺人 被告に懲役10年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588235?source=rss",
      "publishedAt": "2026-07-17T01:31:25.000Z",
      "xQuery": "女性2人承諾殺人 被告に懲役10年"
    },
    {
      "time": "13:38",
      "title": "海上封鎖 イランの影響は限定的?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588254?source=rss",
      "publishedAt": "2026-07-17T04:38:59.000Z",
      "xQuery": "海上封鎖 イランの影響は限定的?"
    },
    {
      "time": "13:35",
      "title": "汚物混入殺人 おむつ替えに不満か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588262?source=rss",
      "publishedAt": "2026-07-17T04:35:50.000Z",
      "xQuery": "汚物混入殺人 おむつ替えに不満か"
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
