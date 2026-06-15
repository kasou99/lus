window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T01:22:16.090Z",
  "items": [
    {
      "time": "08:08",
      "title": "米イランが和平合意 戦闘終結へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584278?source=rss",
      "publishedAt": "2026-06-14T23:08:04.000Z",
      "xQuery": "米イランが和平合意 戦闘終結へ"
    },
    {
      "time": "09:22",
      "title": "NY原油が急落 1バレル=80ドル台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584285?source=rss",
      "publishedAt": "2026-06-15T00:22:15.000Z",
      "xQuery": "NY原油が急落 1バレル=80ドル台"
    },
    {
      "time": "09:40",
      "title": "日経平均 史上初6万9000円台突入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584291?source=rss",
      "publishedAt": "2026-06-15T00:40:20.000Z",
      "xQuery": "日経平均 史上初6万9000円台突入"
    },
    {
      "time": "09:01",
      "title": "両陛下と蘭国王王妃 W杯を観戦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584284?source=rss",
      "publishedAt": "2026-06-15T00:01:53.000Z",
      "xQuery": "両陛下と蘭国王王妃 W杯を観戦"
    },
    {
      "time": "09:19",
      "title": "栃木強殺 主導役の容疑者浮上経緯",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584286?source=rss",
      "publishedAt": "2026-06-15T00:19:52.000Z",
      "xQuery": "栃木強殺 主導役の容疑者浮上経緯"
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
