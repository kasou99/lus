window.LUS_X_NEWS = {
  "updatedAt": "2026-05-22T08:37:33.918Z",
  "items": [
    {
      "time": "15:30",
      "title": "2月の衆院選は「合憲」大阪高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581227?source=rss",
      "publishedAt": "2026-05-22T06:30:26.000Z",
      "xQuery": "2月の衆院選は「合憲」大阪高裁"
    },
    {
      "time": "16:00",
      "title": "東京株終値6万3339円 最高値更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581232?source=rss",
      "publishedAt": "2026-05-22T07:00:34.000Z",
      "xQuery": "東京株終値6万3339円 最高値更新"
    },
    {
      "time": "16:28",
      "title": "国旗損壊罪案 お子様ランチ対象外",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581237?source=rss",
      "publishedAt": "2026-05-22T07:28:35.000Z",
      "xQuery": "国旗損壊罪案 お子様ランチ対象外"
    },
    {
      "time": "17:24",
      "title": "デニム老舗「Lee」売却先が決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581246?source=rss",
      "publishedAt": "2026-05-22T08:24:38.000Z",
      "xQuery": "デニム老舗「Lee」売却先が決定"
    },
    {
      "time": "16:57",
      "title": "サムスンG辞め来日 企業文化驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581243?source=rss",
      "publishedAt": "2026-05-22T07:57:16.000Z",
      "xQuery": "サムスンG辞め来日 企業文化驚き"
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
