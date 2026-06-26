window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T05:35:18.250Z",
  "items": [
    {
      "time": "13:53",
      "title": "27日 ダブル台風が関東に直撃か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585745?source=rss",
      "publishedAt": "2026-06-26T04:53:51.000Z",
      "xQuery": "27日 ダブル台風が関東に直撃か"
    },
    {
      "time": "13:00",
      "title": "ホルムズ海峡に飛翔体 船舶へ攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585735?source=rss",
      "publishedAt": "2026-06-26T04:00:16.000Z",
      "xQuery": "ホルムズ海峡に飛翔体 船舶へ攻撃"
    },
    {
      "time": "13:58",
      "title": "遠のく1500円 最低賃金の重要性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585738?source=rss",
      "publishedAt": "2026-06-26T04:58:44.000Z",
      "xQuery": "遠のく1500円 最低賃金の重要性"
    },
    {
      "time": "14:29",
      "title": "SBIHDとフジHD 戦略的提携を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585748?source=rss",
      "publishedAt": "2026-06-26T05:29:34.000Z",
      "xQuery": "SBIHDとフジHD 戦略的提携を検討"
    },
    {
      "time": "13:00",
      "title": "iPadなど値上げ Appleの株価下落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585737?source=rss",
      "publishedAt": "2026-06-26T04:00:24.000Z",
      "xQuery": "iPadなど値上げ Appleの株価下落"
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
