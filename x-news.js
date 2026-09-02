window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T12:28:17.145Z",
  "items": [
    {
      "time": "19:30",
      "title": "台風24号動き遅く 大雨長引く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594007?source=rss",
      "publishedAt": "2026-09-02T10:30:25.000Z",
      "xQuery": "台風24号動き遅く 大雨長引く恐れ"
    },
    {
      "time": "16:18",
      "title": "土石流1週間 不明者の捜索は難航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593984?source=rss",
      "publishedAt": "2026-09-02T07:18:31.000Z",
      "xQuery": "土石流1週間 不明者の捜索は難航"
    },
    {
      "time": "20:24",
      "title": "和菓子店の店主死亡 長男コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594016?source=rss",
      "publishedAt": "2026-09-02T11:24:39.000Z",
      "xQuery": "和菓子店の店主死亡 長男コメント"
    },
    {
      "time": "19:33",
      "title": "25年前に勤務先生徒と性行為 処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594012?source=rss",
      "publishedAt": "2026-09-02T10:33:11.000Z",
      "xQuery": "25年前に勤務先生徒と性行為 処分"
    },
    {
      "time": "20:39",
      "title": "ファミマ おにぎり4品値下げ発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594014?source=rss",
      "publishedAt": "2026-09-02T11:39:43.000Z",
      "xQuery": "ファミマ おにぎり4品値下げ発表"
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
