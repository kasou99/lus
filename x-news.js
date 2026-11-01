window.LUS_X_NEWS = {
  "updatedAt": "2026-11-01T10:09:50.743Z",
  "items": [
    {
      "time": "17:55",
      "title": "高市政権「脱リフレ」するか注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600965?source=rss",
      "publishedAt": "2026-11-01T08:55:57.000Z",
      "xQuery": "高市政権「脱リフレ」するか注目"
    },
    {
      "time": "14:04",
      "title": "緊急事態条項の創設巡り賛否 見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600935?source=rss",
      "publishedAt": "2026-11-01T05:04:55.000Z",
      "xQuery": "緊急事態条項の創設巡り賛否 見解"
    },
    {
      "time": "19:04",
      "title": "堤防で釣りの4人海に転落 2人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600974?source=rss",
      "publishedAt": "2026-11-01T10:04:53.000Z",
      "xQuery": "堤防で釣りの4人海に転落 2人不明"
    },
    {
      "time": "16:00",
      "title": "アマゾン奥地で相次ぐ 子の異変",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600956?source=rss",
      "publishedAt": "2026-11-01T07:00:58.000Z",
      "xQuery": "アマゾン奥地で相次ぐ 子の異変"
    },
    {
      "time": "15:29",
      "title": "「ドパ親」に頭を抱える家族 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600953?source=rss",
      "publishedAt": "2026-11-01T06:29:23.000Z",
      "xQuery": "「ドパ親」に頭を抱える家族 背景"
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
