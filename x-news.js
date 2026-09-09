window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T06:31:17.998Z",
  "items": [
    {
      "time": "15:18",
      "title": "東北〜近畿で大雨 災害に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594749?source=rss",
      "publishedAt": "2026-09-09T06:18:51.000Z",
      "xQuery": "東北〜近畿で大雨 災害に厳重警戒"
    },
    {
      "time": "14:44",
      "title": "福岡県議会 新議長に自民・大島氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594748?source=rss",
      "publishedAt": "2026-09-09T05:44:31.000Z",
      "xQuery": "福岡県議会 新議長に自民・大島氏"
    },
    {
      "time": "13:16",
      "title": "車200台が浸水し立ち往生 名古屋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594742?source=rss",
      "publishedAt": "2026-09-09T04:16:32.000Z",
      "xQuery": "車200台が浸水し立ち往生 名古屋"
    },
    {
      "time": "14:49",
      "title": "子宮全摘でぼうこう裂け 壮絶闘病",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594746?source=rss",
      "publishedAt": "2026-09-09T05:49:43.000Z",
      "xQuery": "子宮全摘でぼうこう裂け 壮絶闘病"
    },
    {
      "time": "14:31",
      "title": "東京五輪銀の本多灯被告 有罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594745?source=rss",
      "publishedAt": "2026-09-09T05:31:40.000Z",
      "xQuery": "東京五輪銀の本多灯被告 有罪判決"
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
