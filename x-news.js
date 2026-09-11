window.LUS_X_NEWS = {
  "updatedAt": "2026-09-11T12:46:40.596Z",
  "items": [
    {
      "time": "21:19",
      "title": "俳優の森本レオさんが死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594989?source=rss",
      "publishedAt": "2026-09-11T12:19:16.000Z",
      "xQuery": "俳優の森本レオさんが死去"
    },
    {
      "time": "17:34",
      "title": "「トランプ配当金」共和党内賛否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594966?source=rss",
      "publishedAt": "2026-09-11T08:34:54.000Z",
      "xQuery": "「トランプ配当金」共和党内賛否"
    },
    {
      "time": "19:00",
      "title": "ソニー生命新たに5千万円詐取判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594977?source=rss",
      "publishedAt": "2026-09-11T10:00:50.000Z",
      "xQuery": "ソニー生命新たに5千万円詐取判明"
    },
    {
      "time": "20:57",
      "title": "中国 日本人ビザ約7.5倍に値上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594984?source=rss",
      "publishedAt": "2026-09-11T11:57:42.000Z",
      "xQuery": "中国 日本人ビザ約7.5倍に値上げ"
    },
    {
      "time": "19:26",
      "title": "くら寿司苦戦 大手3社で業績に差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594979?source=rss",
      "publishedAt": "2026-09-11T10:26:48.000Z",
      "xQuery": "くら寿司苦戦 大手3社で業績に差"
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
