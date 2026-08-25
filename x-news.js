window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T09:16:20.161Z",
  "items": [
    {
      "time": "18:07",
      "title": "ガソリン補助金継続へ 高市氏表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593042?source=rss",
      "publishedAt": "2026-08-25T09:07:36.000Z",
      "xQuery": "ガソリン補助金継続へ 高市氏表明"
    },
    {
      "time": "14:21",
      "title": "政府のアニメ支援 現場に届かぬ訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592997?source=rss",
      "publishedAt": "2026-08-25T05:21:29.000Z",
      "xQuery": "政府のアニメ支援 現場に届かぬ訳"
    },
    {
      "time": "17:53",
      "title": "米デスバレー立ち往生 観光客死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593039?source=rss",
      "publishedAt": "2026-08-25T08:53:13.000Z",
      "xQuery": "米デスバレー立ち往生 観光客死亡"
    },
    {
      "time": "16:31",
      "title": "競泳・本多灯被告に拘禁刑1年求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593020?source=rss",
      "publishedAt": "2026-08-25T07:31:06.000Z",
      "xQuery": "競泳・本多灯被告に拘禁刑1年求刑"
    },
    {
      "time": "17:33",
      "title": "モス スーパーなどで冷食販売へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593030?source=rss",
      "publishedAt": "2026-08-25T08:33:42.000Z",
      "xQuery": "モス スーパーなどで冷食販売へ"
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
