window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T03:43:01.591Z",
  "items": [
    {
      "time": "12:03",
      "title": "日銀 政策金利を1.25%に引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595682?source=rss",
      "publishedAt": "2026-09-18T03:03:28.000Z",
      "xQuery": "日銀 政策金利を1.25%に引き上げ"
    },
    {
      "time": "12:21",
      "title": "台風が関東接近へ 道路冠水の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595683?source=rss",
      "publishedAt": "2026-09-18T03:21:39.000Z",
      "xQuery": "台風が関東接近へ 道路冠水の恐れ"
    },
    {
      "time": "11:21",
      "title": "南アフリカ 正・副大統領が休養",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595674?source=rss",
      "publishedAt": "2026-09-18T02:21:22.000Z",
      "xQuery": "南アフリカ 正・副大統領が休養"
    },
    {
      "time": "10:08",
      "title": "生活道路で死亡ひき逃げ疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595669?source=rss",
      "publishedAt": "2026-09-18T01:08:59.000Z",
      "xQuery": "生活道路で死亡ひき逃げ疑い 逮捕"
    },
    {
      "time": "11:42",
      "title": "大阪駅前の突起物 フェンス設置へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595676?source=rss",
      "publishedAt": "2026-09-18T02:42:49.000Z",
      "xQuery": "大阪駅前の突起物 フェンス設置へ"
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
