window.LUS_X_NEWS = {
  "updatedAt": "2026-11-28T00:47:33.178Z",
  "items": [
    {
      "time": "09:13",
      "title": "気温変化 暖かい雨から冷たい雨へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604269?source=rss",
      "publishedAt": "2026-11-28T00:13:15.000Z",
      "xQuery": "気温変化 暖かい雨から冷たい雨へ"
    },
    {
      "time": "07:58",
      "title": "政治資金パーティーの収入 37%増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604259?source=rss",
      "publishedAt": "2026-11-27T22:58:39.000Z",
      "xQuery": "政治資金パーティーの収入 37%増"
    },
    {
      "time": "08:20",
      "title": "2遺体 不明生徒誘拐疑いで男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604260?source=rss",
      "publishedAt": "2026-11-27T23:20:33.000Z",
      "xQuery": "2遺体 不明生徒誘拐疑いで男逮捕"
    },
    {
      "time": "08:08",
      "title": "邦人を売春させた疑い 韓国で捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604254?source=rss",
      "publishedAt": "2026-11-27T23:08:30.000Z",
      "xQuery": "邦人を売春させた疑い 韓国で捜査"
    },
    {
      "time": "07:26",
      "title": "「かっぱ寿司」なぜ赤字に転落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604250?source=rss",
      "publishedAt": "2026-11-27T22:26:15.000Z",
      "xQuery": "「かっぱ寿司」なぜ赤字に転落"
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
