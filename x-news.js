window.LUS_X_NEWS = {
  "updatedAt": "2026-10-21T06:29:57.678Z",
  "items": [
    {
      "time": "14:15",
      "title": "電気ガス料金 1～3月分の補助検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599582?source=rss",
      "publishedAt": "2026-10-21T05:15:19.000Z",
      "xQuery": "電気ガス料金 1～3月分の補助検討"
    },
    {
      "time": "11:36",
      "title": "消費減税の財源 首相は従来の答弁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599559?source=rss",
      "publishedAt": "2026-10-21T02:36:50.000Z",
      "xQuery": "消費減税の財源 首相は従来の答弁"
    },
    {
      "time": "13:00",
      "title": "八潮陥没 遺族が賠償求め県を提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599573?source=rss",
      "publishedAt": "2026-10-21T04:00:34.000Z",
      "xQuery": "八潮陥没 遺族が賠償求め県を提訴"
    },
    {
      "time": "14:06",
      "title": "逮捕後に16歳が死亡 裁判で母訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599578?source=rss",
      "publishedAt": "2026-10-21T05:06:26.000Z",
      "xQuery": "逮捕後に16歳が死亡 裁判で母訴え"
    },
    {
      "time": "14:08",
      "title": "カフェインレスコーヒー 市場拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599579?source=rss",
      "publishedAt": "2026-10-21T05:08:53.000Z",
      "xQuery": "カフェインレスコーヒー 市場拡大"
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
