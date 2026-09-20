window.LUS_X_NEWS = {
  "updatedAt": "2026-09-20T02:25:42.590Z",
  "items": [
    {
      "time": "10:29",
      "title": "関東と東海 今夜道路冠水の恐れも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595884?source=rss",
      "publishedAt": "2026-09-20T01:29:51.000Z",
      "xQuery": "関東と東海 今夜道路冠水の恐れも"
    },
    {
      "time": "09:22",
      "title": "ホワイトハウス CNN記者証を没収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595876?source=rss",
      "publishedAt": "2026-09-20T00:22:22.000Z",
      "xQuery": "ホワイトハウス CNN記者証を没収"
    },
    {
      "time": "11:17",
      "title": "高2死亡 殺人疑いで少年4人再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595886?source=rss",
      "publishedAt": "2026-09-20T02:17:00.000Z",
      "xQuery": "高2死亡 殺人疑いで少年4人再逮捕"
    },
    {
      "time": "08:27",
      "title": "6歳行方不明 現場の警察官の執念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595870?source=rss",
      "publishedAt": "2026-09-19T23:27:02.000Z",
      "xQuery": "6歳行方不明 現場の警察官の執念"
    },
    {
      "time": "09:18",
      "title": "4年でケアマネ300人以上減 新潟県",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595874?source=rss",
      "publishedAt": "2026-09-20T00:18:30.000Z",
      "xQuery": "4年でケアマネ300人以上減 新潟県"
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
