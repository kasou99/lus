window.LUS_X_NEWS = {
  "updatedAt": "2026-11-19T06:20:27.837Z",
  "items": [
    {
      "time": "13:37",
      "title": "APEC 中国が見せた「線引き」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603146?source=rss",
      "publishedAt": "2026-11-19T04:37:28.000Z",
      "xQuery": "APEC 中国が見せた「線引き」"
    },
    {
      "time": "14:03",
      "title": "文科相の進退巡り 野党の足並み鍵",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603144?source=rss",
      "publishedAt": "2026-11-19T05:03:53.000Z",
      "xQuery": "文科相の進退巡り 野党の足並み鍵"
    },
    {
      "time": "13:49",
      "title": "岩手の震災遺体 90歳男性と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603154?source=rss",
      "publishedAt": "2026-11-19T04:49:30.000Z",
      "xQuery": "岩手の震災遺体 90歳男性と判明"
    },
    {
      "time": "14:48",
      "title": "クマに追いかけられた 高校生通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603160?source=rss",
      "publishedAt": "2026-11-19T05:48:07.000Z",
      "xQuery": "クマに追いかけられた 高校生通報"
    },
    {
      "time": "14:32",
      "title": "23年に男性死亡 仕事仲間の男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603158?source=rss",
      "publishedAt": "2026-11-19T05:32:08.000Z",
      "xQuery": "23年に男性死亡 仕事仲間の男逮捕"
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
