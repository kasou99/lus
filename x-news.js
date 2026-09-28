window.LUS_X_NEWS = {
  "updatedAt": "2026-09-28T02:34:02.555Z",
  "items": [
    {
      "time": "09:16",
      "title": "災害時デマ対策 自治体が広域連携",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596803?source=rss",
      "publishedAt": "2026-09-28T00:16:30.000Z",
      "xQuery": "災害時デマ対策 自治体が広域連携"
    },
    {
      "time": "09:04",
      "title": "東証IPO最少ペース 1-8月に22社",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596802?source=rss",
      "publishedAt": "2026-09-28T00:04:40.000Z",
      "xQuery": "東証IPO最少ペース 1-8月に22社"
    },
    {
      "time": "10:21",
      "title": "群馬殺害 男が事前に包丁準備か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596809?source=rss",
      "publishedAt": "2026-09-28T01:21:04.000Z",
      "xQuery": "群馬殺害 男が事前に包丁準備か"
    },
    {
      "time": "11:31",
      "title": "台風で最愛の妻死亡 結婚して2年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596820?source=rss",
      "publishedAt": "2026-09-28T02:31:05.000Z",
      "xQuery": "台風で最愛の妻死亡 結婚して2年"
    },
    {
      "time": "10:34",
      "title": "車衝突し田に横転 運転の男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596812?source=rss",
      "publishedAt": "2026-09-28T01:34:22.000Z",
      "xQuery": "車衝突し田に横転 運転の男性死亡"
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
