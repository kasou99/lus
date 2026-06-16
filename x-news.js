window.LUS_X_NEWS = {
  "updatedAt": "2026-06-16T06:00:40.686Z",
  "items": [
    {
      "time": "12:50",
      "title": "日経平均 史上初の7万円突破",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584445?source=rss",
      "publishedAt": "2026-06-16T03:50:50.000Z",
      "xQuery": "日経平均 史上初の7万円突破"
    },
    {
      "time": "12:31",
      "title": "日銀1%程度に利上げ 31年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584440?source=rss",
      "publishedAt": "2026-06-16T03:31:59.000Z",
      "xQuery": "日銀1%程度に利上げ 31年ぶり水準"
    },
    {
      "time": "12:19",
      "title": "アイス大手6社 値上げ幅調整疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584438?source=rss",
      "publishedAt": "2026-06-16T03:19:20.000Z",
      "xQuery": "アイス大手6社 値上げ幅調整疑い"
    },
    {
      "time": "14:17",
      "title": "富士通の会長が辞任 不適切な行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584451?source=rss",
      "publishedAt": "2026-06-16T05:17:16.000Z",
      "xQuery": "富士通の会長が辞任 不適切な行動"
    },
    {
      "time": "14:40",
      "title": "下鴨神社 樹齢450年の大木倒れる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584453?source=rss",
      "publishedAt": "2026-06-16T05:40:03.000Z",
      "xQuery": "下鴨神社 樹齢450年の大木倒れる"
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
