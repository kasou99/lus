window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T14:50:10.397Z",
  "items": [
    {
      "time": "23:16",
      "title": "千葉県 明け方まで激しい雷雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591752?source=rss",
      "publishedAt": "2026-08-14T14:16:26.000Z",
      "xQuery": "千葉県 明け方まで激しい雷雨恐れ"
    },
    {
      "time": "19:53",
      "title": "千葉豪雨 放置車両1200台超見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591735?source=rss",
      "publishedAt": "2026-08-14T10:53:47.000Z",
      "xQuery": "千葉豪雨 放置車両1200台超見通し"
    },
    {
      "time": "23:42",
      "title": "スマホ水没・水ぬれ時 NGな行為",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591755?source=rss",
      "publishedAt": "2026-08-14T14:42:27.000Z",
      "xQuery": "スマホ水没・水ぬれ時 NGな行為"
    },
    {
      "time": "23:26",
      "title": "横浜市長に辞職要求 市議会3会派",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591753?source=rss",
      "publishedAt": "2026-08-14T14:26:55.000Z",
      "xQuery": "横浜市長に辞職要求 市議会3会派"
    },
    {
      "time": "23:05",
      "title": "エルニーニョ 非常に強くなる恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591750?source=rss",
      "publishedAt": "2026-08-14T14:05:10.000Z",
      "xQuery": "エルニーニョ 非常に強くなる恐れ"
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
