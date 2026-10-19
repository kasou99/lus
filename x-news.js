window.LUS_X_NEWS = {
  "updatedAt": "2026-10-19T13:20:59.351Z",
  "items": [
    {
      "time": "18:35",
      "title": "海自の中東派遣 1年間延長の方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599376?source=rss",
      "publishedAt": "2026-10-19T09:35:21.000Z",
      "xQuery": "海自の中東派遣 1年間延長の方針"
    },
    {
      "time": "21:26",
      "title": "金与正氏 韓国軍非難する談話発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599392?source=rss",
      "publishedAt": "2026-10-19T12:26:49.000Z",
      "xQuery": "金与正氏 韓国軍非難する談話発表"
    },
    {
      "time": "19:14",
      "title": "農作業の死亡事故多発 鳥取で警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599380?source=rss",
      "publishedAt": "2026-10-19T10:14:07.000Z",
      "xQuery": "農作業の死亡事故多発 鳥取で警報"
    },
    {
      "time": "18:56",
      "title": "男児に花火当てた疑い 支援員逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599377?source=rss",
      "publishedAt": "2026-10-19T09:56:23.000Z",
      "xQuery": "男児に花火当てた疑い 支援員逮捕"
    },
    {
      "time": "19:24",
      "title": "「小泉総理」高市氏が言い間違え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599382?source=rss",
      "publishedAt": "2026-10-19T10:24:16.000Z",
      "xQuery": "「小泉総理」高市氏が言い間違え"
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
