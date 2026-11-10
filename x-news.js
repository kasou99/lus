window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T06:18:52.408Z",
  "items": [
    {
      "time": "12:49",
      "title": "内水氾濫の被害軽減へ 国が対応策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602029?source=rss",
      "publishedAt": "2026-11-10T03:49:52.000Z",
      "xQuery": "内水氾濫の被害軽減へ 国が対応策"
    },
    {
      "time": "10:09",
      "title": "露政権批判の代表紙 編集部を閉鎖",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602002?source=rss",
      "publishedAt": "2026-11-10T01:09:18.000Z",
      "xQuery": "露政権批判の代表紙 編集部を閉鎖"
    },
    {
      "time": "15:01",
      "title": "米国防長官に弾劾決議案 何が問題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602042?source=rss",
      "publishedAt": "2026-11-10T06:01:48.000Z",
      "xQuery": "米国防長官に弾劾決議案 何が問題"
    },
    {
      "time": "14:30",
      "title": "NVIDIA巡る疑惑 米対応に注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602035?source=rss",
      "publishedAt": "2026-11-10T05:30:14.000Z",
      "xQuery": "NVIDIA巡る疑惑 米対応に注目"
    },
    {
      "time": "12:17",
      "title": "徳島・阿波市長ら 詐欺疑いで逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602024?source=rss",
      "publishedAt": "2026-11-10T03:17:55.000Z",
      "xQuery": "徳島・阿波市長ら 詐欺疑いで逮捕"
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
