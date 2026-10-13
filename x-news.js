window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T14:22:11.531Z",
  "items": [
    {
      "time": "22:08",
      "title": "首相 今夜にも簗氏に電話で聴取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598658?source=rss",
      "publishedAt": "2026-10-13T13:08:05.000Z",
      "xQuery": "首相 今夜にも簗氏に電話で聴取"
    },
    {
      "time": "21:45",
      "title": "食事券発行の需要喚起策 見送りへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598655?source=rss",
      "publishedAt": "2026-10-13T12:45:36.000Z",
      "xQuery": "食事券発行の需要喚起策 見送りへ"
    },
    {
      "time": "23:04",
      "title": "教科書ページ上限設定へ 70年ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598664?source=rss",
      "publishedAt": "2026-10-13T14:04:27.000Z",
      "xQuery": "教科書ページ上限設定へ 70年ぶり"
    },
    {
      "time": "22:44",
      "title": "無免許運転か 車突っ込み男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598663?source=rss",
      "publishedAt": "2026-10-13T13:44:13.000Z",
      "xQuery": "無免許運転か 車突っ込み男性死亡"
    },
    {
      "time": "22:40",
      "title": "列車撮影目的か 往来危険疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598662?source=rss",
      "publishedAt": "2026-10-13T13:40:52.000Z",
      "xQuery": "列車撮影目的か 往来危険疑い逮捕"
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
