window.LUS_X_NEWS = {
  "updatedAt": "2026-05-21T10:47:22.701Z",
  "items": [
    {
      "time": "19:23",
      "title": "首相を支援 340人超の巨大議連",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581128?source=rss",
      "publishedAt": "2026-05-21T10:23:26.000Z",
      "xQuery": "首相を支援 340人超の巨大議連"
    },
    {
      "time": "19:34",
      "title": "エチレン生産3.6%増 稼働率最低",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581130?source=rss",
      "publishedAt": "2026-05-21T10:34:23.000Z",
      "xQuery": "エチレン生産3.6%増 稼働率最低"
    },
    {
      "time": "17:57",
      "title": "動物園職員 殺人容疑で再逮捕方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581119?source=rss",
      "publishedAt": "2026-05-21T08:57:39.000Z",
      "xQuery": "動物園職員 殺人容疑で再逮捕方針"
    },
    {
      "time": "18:43",
      "title": "官邸官僚 女性記者に不適切行為",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581126?source=rss",
      "publishedAt": "2026-05-21T09:43:09.000Z",
      "xQuery": "官邸官僚 女性記者に不適切行為"
    },
    {
      "time": "19:25",
      "title": "マンホール事故 死因は低酸素脳症",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581129?source=rss",
      "publishedAt": "2026-05-21T10:25:09.000Z",
      "xQuery": "マンホール事故 死因は低酸素脳症"
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
