window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T11:19:20.197Z",
  "items": [
    {
      "time": "15:41",
      "title": "8月も高温傾向続く 今後の見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590615?source=rss",
      "publishedAt": "2026-08-05T06:41:18.000Z",
      "xQuery": "8月も高温傾向続く 今後の見通し"
    },
    {
      "time": "16:44",
      "title": "爆発巡り イオンが事故調査委設置",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590622?source=rss",
      "publishedAt": "2026-08-05T07:44:11.000Z",
      "xQuery": "爆発巡り イオンが事故調査委設置"
    },
    {
      "time": "19:53",
      "title": "露がウ首都周辺を攻撃 17人が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590654?source=rss",
      "publishedAt": "2026-08-05T10:53:29.000Z",
      "xQuery": "露がウ首都周辺を攻撃 17人が死亡"
    },
    {
      "time": "18:54",
      "title": "イオン熊本の爆発 LPガス原因か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590647?source=rss",
      "publishedAt": "2026-08-05T09:54:45.000Z",
      "xQuery": "イオン熊本の爆発 LPガス原因か"
    },
    {
      "time": "17:40",
      "title": "6人デスクワーク中死亡 日本製紙",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590632?source=rss",
      "publishedAt": "2026-08-05T08:40:47.000Z",
      "xQuery": "6人デスクワーク中死亡 日本製紙"
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
