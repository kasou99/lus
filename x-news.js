window.LUS_X_NEWS = {
  "updatedAt": "2026-11-08T03:14:06.776Z",
  "items": [
    {
      "time": "11:55",
      "title": "震度5強 南海トラフと関連性低い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601764?source=rss",
      "publishedAt": "2026-11-08T02:55:40.000Z",
      "xQuery": "震度5強 南海トラフと関連性低い"
    },
    {
      "time": "10:37",
      "title": "JR内房線 1カ月半ぶりに全線再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601755?source=rss",
      "publishedAt": "2026-11-08T01:37:50.000Z",
      "xQuery": "JR内房線 1カ月半ぶりに全線再開"
    },
    {
      "time": "10:22",
      "title": "東大の新学部開設 学生有志猛反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601752?source=rss",
      "publishedAt": "2026-11-08T01:22:44.000Z",
      "xQuery": "東大の新学部開設 学生有志猛反発"
    },
    {
      "time": "08:53",
      "title": "iPS細胞活用のがん治験 来年開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601739?source=rss",
      "publishedAt": "2026-11-07T23:53:34.000Z",
      "xQuery": "iPS細胞活用のがん治験 来年開始"
    },
    {
      "time": "09:33",
      "title": "「なりすまし電話」巧妙化 対策は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601743?source=rss",
      "publishedAt": "2026-11-08T00:33:18.000Z",
      "xQuery": "「なりすまし電話」巧妙化 対策は"
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
