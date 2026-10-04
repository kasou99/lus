window.LUS_X_NEWS = {
  "updatedAt": "2026-10-04T08:11:37.696Z",
  "items": [
    {
      "time": "16:34",
      "title": "岩屋氏を異例の厚遇 中国側思惑は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597518?source=rss",
      "publishedAt": "2026-10-04T07:34:16.000Z",
      "xQuery": "岩屋氏を異例の厚遇 中国側思惑は"
    },
    {
      "time": "15:49",
      "title": "那覇強殺 女性の死因は「窒息」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597511?source=rss",
      "publishedAt": "2026-10-04T06:49:20.000Z",
      "xQuery": "那覇強殺 女性の死因は「窒息」"
    },
    {
      "time": "16:24",
      "title": "大阪の2市合併検討へ 副首都視野",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597517?source=rss",
      "publishedAt": "2026-10-04T07:24:58.000Z",
      "xQuery": "大阪の2市合併検討へ 副首都視野"
    },
    {
      "time": "14:52",
      "title": "片山さつき財務相 事前運動の疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597502?source=rss",
      "publishedAt": "2026-10-04T05:52:09.000Z",
      "xQuery": "片山さつき財務相 事前運動の疑い"
    },
    {
      "time": "15:29",
      "title": "企業は「高専卒」に熱視線か 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597509?source=rss",
      "publishedAt": "2026-10-04T06:29:46.000Z",
      "xQuery": "企業は「高専卒」に熱視線か 背景"
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
