window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T04:35:56.215Z",
  "items": [
    {
      "time": "13:13",
      "title": "ドコモ携帯 全国で障害が発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601414?source=rss",
      "publishedAt": "2026-11-05T04:13:44.000Z",
      "xQuery": "ドコモ携帯 全国で障害が発生"
    },
    {
      "time": "08:10",
      "title": "エボラ巡り新ワクチン治験 WHO",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601378?source=rss",
      "publishedAt": "2026-11-04T23:10:49.000Z",
      "xQuery": "エボラ巡り新ワクチン治験 WHO"
    },
    {
      "time": "12:18",
      "title": "蔵内前議長 現金受け取っていない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601408?source=rss",
      "publishedAt": "2026-11-05T03:18:56.000Z",
      "xQuery": "蔵内前議長 現金受け取っていない"
    },
    {
      "time": "12:32",
      "title": "米共和党 大敗の責任押し付け合い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601407?source=rss",
      "publishedAt": "2026-11-05T03:32:04.000Z",
      "xQuery": "米共和党 大敗の責任押し付け合い"
    },
    {
      "time": "11:36",
      "title": "海に新生児らしき遺体 死因が判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601397?source=rss",
      "publishedAt": "2026-11-05T02:36:13.000Z",
      "xQuery": "海に新生児らしき遺体 死因が判明"
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
