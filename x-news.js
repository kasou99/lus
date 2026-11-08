window.LUS_X_NEWS = {
  "updatedAt": "2026-11-08T01:11:25.024Z",
  "items": [
    {
      "time": "07:51",
      "title": "愛知県で震度5強観測 約30年ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601732?source=rss",
      "publishedAt": "2026-11-07T22:51:32.000Z",
      "xQuery": "愛知県で震度5強観測 約30年ぶり"
    },
    {
      "time": "08:24",
      "title": "あす都心11℃予想 12月下旬並み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601737?source=rss",
      "publishedAt": "2026-11-07T23:24:51.000Z",
      "xQuery": "あす都心11℃予想 12月下旬並み"
    },
    {
      "time": "09:58",
      "title": "アメ横周辺 路上営業巡り家宅捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601748?source=rss",
      "publishedAt": "2026-11-08T00:58:20.000Z",
      "xQuery": "アメ横周辺 路上営業巡り家宅捜索"
    },
    {
      "time": "08:12",
      "title": "互いに譲らず 冷え切った日中関係",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601734?source=rss",
      "publishedAt": "2026-11-07T23:12:25.000Z",
      "xQuery": "互いに譲らず 冷え切った日中関係"
    },
    {
      "time": "09:20",
      "title": "東京・調布 VIVANTファンで盛況",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601742?source=rss",
      "publishedAt": "2026-11-08T00:20:26.000Z",
      "xQuery": "東京・調布 VIVANTファンで盛況"
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
