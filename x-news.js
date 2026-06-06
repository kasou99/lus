window.LUS_X_NEWS = {
  "updatedAt": "2026-06-06T06:40:49.547Z",
  "items": [
    {
      "time": "14:36",
      "title": "米軍 イランのレーダー施設を攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583166?source=rss",
      "publishedAt": "2026-06-06T05:36:45.000Z",
      "xQuery": "米軍 イランのレーダー施設を攻撃"
    },
    {
      "time": "10:57",
      "title": "米‌政府がAI企業株取得を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583146?source=rss",
      "publishedAt": "2026-06-06T01:57:35.000Z",
      "xQuery": "米‌政府がAI企業株取得を検討"
    },
    {
      "time": "15:25",
      "title": "週明けにかけて警報級大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583172?source=rss",
      "publishedAt": "2026-06-06T06:25:24.000Z",
      "xQuery": "週明けにかけて警報級大雨の恐れ"
    },
    {
      "time": "13:05",
      "title": "データセンター建設 都市部で摩擦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583157?source=rss",
      "publishedAt": "2026-06-06T04:05:53.000Z",
      "xQuery": "データセンター建設 都市部で摩擦"
    },
    {
      "time": "13:16",
      "title": "90回近くチケ転売 待っていた制裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583160?source=rss",
      "publishedAt": "2026-06-06T04:16:36.000Z",
      "xQuery": "90回近くチケ転売 待っていた制裁"
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
