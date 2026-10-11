window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T02:34:46.126Z",
  "items": [
    {
      "time": "11:09",
      "title": "ICC議長団 米に制裁撤回を要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598349?source=rss",
      "publishedAt": "2026-10-11T02:09:18.000Z",
      "xQuery": "ICC議長団 米に制裁撤回を要求"
    },
    {
      "time": "08:02",
      "title": "米で銃撃 子どもや妊婦ら8人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598319?source=rss",
      "publishedAt": "2026-10-10T23:02:36.000Z",
      "xQuery": "米で銃撃 子どもや妊婦ら8人死亡"
    },
    {
      "time": "10:07",
      "title": "免許画像流出 再交付の申請相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598339?source=rss",
      "publishedAt": "2026-10-11T01:07:47.000Z",
      "xQuery": "免許画像流出 再交付の申請相次ぐ"
    },
    {
      "time": "10:09",
      "title": "動物公園でトラに襲われ死亡 英",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598340?source=rss",
      "publishedAt": "2026-10-11T01:09:51.000Z",
      "xQuery": "動物公園でトラに襲われ死亡 英"
    },
    {
      "time": "11:24",
      "title": "離婚兆候?「別れの四重奏」とは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598351?source=rss",
      "publishedAt": "2026-10-11T02:24:32.000Z",
      "xQuery": "離婚兆候?「別れの四重奏」とは"
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
