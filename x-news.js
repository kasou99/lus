window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T02:26:23.574Z",
  "items": [
    {
      "time": "09:28",
      "title": "台風6号接近 奄美大島が暴風域に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582627?source=rss",
      "publishedAt": "2026-06-02T00:28:27.000Z",
      "xQuery": "台風6号接近 奄美大島が暴風域に"
    },
    {
      "time": "08:35",
      "title": "出生前診断 10年余りで4倍に増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582620?source=rss",
      "publishedAt": "2026-06-01T23:35:26.000Z",
      "xQuery": "出生前診断 10年余りで4倍に増加"
    },
    {
      "time": "11:13",
      "title": "損傷の激しい遺体 近くでクマ捕獲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582637?source=rss",
      "publishedAt": "2026-06-02T02:13:04.000Z",
      "xQuery": "損傷の激しい遺体 近くでクマ捕獲"
    },
    {
      "time": "10:11",
      "title": "自転車と衝突 歩行者が意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582632?source=rss",
      "publishedAt": "2026-06-02T01:11:34.000Z",
      "xQuery": "自転車と衝突 歩行者が意識不明"
    },
    {
      "time": "10:40",
      "title": "マンジャロ違法販売疑い 書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582634?source=rss",
      "publishedAt": "2026-06-02T01:40:51.000Z",
      "xQuery": "マンジャロ違法販売疑い 書類送検"
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
