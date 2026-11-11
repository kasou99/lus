window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T20:11:21.302Z",
  "items": [
    {
      "time": "21:05",
      "title": "消費減税法案 支援金巡り野党追及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602215?source=rss",
      "publishedAt": "2026-11-11T12:05:32.000Z",
      "xQuery": "消費減税法案 支援金巡り野党追及"
    },
    {
      "time": "22:26",
      "title": "Amazon「表示枠」公取なぜ問題視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602231?source=rss",
      "publishedAt": "2026-11-11T13:26:37.000Z",
      "xQuery": "Amazon「表示枠」公取なぜ問題視"
    },
    {
      "time": "21:30",
      "title": "月収5万円 受診遅れ死亡した男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602222?source=rss",
      "publishedAt": "2026-11-11T12:30:08.000Z",
      "xQuery": "月収5万円 受診遅れ死亡した男性"
    },
    {
      "time": "23:55",
      "title": "約6300の学校に爆破予告メール 伊",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602234?source=rss",
      "publishedAt": "2026-11-11T14:55:23.000Z",
      "xQuery": "約6300の学校に爆破予告メール 伊"
    },
    {
      "time": "22:54",
      "title": "開発事業者がミラー設置断る 困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602232?source=rss",
      "publishedAt": "2026-11-11T13:54:56.000Z",
      "xQuery": "開発事業者がミラー設置断る 困惑"
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
