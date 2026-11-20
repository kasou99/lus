window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T08:15:41.591Z",
  "items": [
    {
      "time": "15:48",
      "title": "日経平均終値3007円安 AI巡り混乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603296?source=rss",
      "publishedAt": "2026-11-20T06:48:16.000Z",
      "xQuery": "日経平均終値3007円安 AI巡り混乱"
    },
    {
      "time": "16:28",
      "title": "群馬3人死亡事故 懲役20年が確定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603301?source=rss",
      "publishedAt": "2026-11-20T07:28:46.000Z",
      "xQuery": "群馬3人死亡事故 懲役20年が確定"
    },
    {
      "time": "16:25",
      "title": "首相が中国到着時 タラップに段差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603300?source=rss",
      "publishedAt": "2026-11-20T07:25:56.000Z",
      "xQuery": "首相が中国到着時 タラップに段差"
    },
    {
      "time": "16:20",
      "title": "置き配は玄関前で配達完了 指針案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603298?source=rss",
      "publishedAt": "2026-11-20T07:20:05.000Z",
      "xQuery": "置き配は玄関前で配達完了 指針案"
    },
    {
      "time": "15:43",
      "title": "横浜市長の家賃42万円 9割市負担",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603295?source=rss",
      "publishedAt": "2026-11-20T06:43:44.000Z",
      "xQuery": "横浜市長の家賃42万円 9割市負担"
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
