window.LUS_X_NEWS = {
  "updatedAt": "2026-10-03T01:30:37.962Z",
  "items": [
    {
      "time": "10:12",
      "title": "人口水増し疑惑 富山市役所を捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597359?source=rss",
      "publishedAt": "2026-10-03T01:12:21.000Z",
      "xQuery": "人口水増し疑惑 富山市役所を捜索"
    },
    {
      "time": "07:46",
      "title": "副首都となる要件 4道府県満たす",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597340?source=rss",
      "publishedAt": "2026-10-02T22:46:02.000Z",
      "xQuery": "副首都となる要件 4道府県満たす"
    },
    {
      "time": "09:35",
      "title": "行楽日和 東京の雨記録ストップへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597352?source=rss",
      "publishedAt": "2026-10-03T00:35:46.000Z",
      "xQuery": "行楽日和 東京の雨記録ストップへ"
    },
    {
      "time": "07:31",
      "title": "上司を「さん」呼びが増加 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597339?source=rss",
      "publishedAt": "2026-10-02T22:31:38.000Z",
      "xQuery": "上司を「さん」呼びが増加 調査"
    },
    {
      "time": "10:02",
      "title": "ABAHOUSE 全顧客の情報漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597358?source=rss",
      "publishedAt": "2026-10-03T01:02:09.000Z",
      "xQuery": "ABAHOUSE 全顧客の情報漏えいか"
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
