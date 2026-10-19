window.LUS_X_NEWS = {
  "updatedAt": "2026-10-19T20:18:01.774Z",
  "items": [
    {
      "time": "23:05",
      "title": "仏首相 一部に夜間外出禁止令要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599406?source=rss",
      "publishedAt": "2026-10-19T14:05:17.000Z",
      "xQuery": "仏首相 一部に夜間外出禁止令要請"
    },
    {
      "time": "22:32",
      "title": "特定技能「給食」受け入れ再開へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599400?source=rss",
      "publishedAt": "2026-10-19T13:32:39.000Z",
      "xQuery": "特定技能「給食」受け入れ再開へ"
    },
    {
      "time": "23:55",
      "title": "ウ軍 ドローンで空から負傷兵救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599410?source=rss",
      "publishedAt": "2026-10-19T14:55:38.000Z",
      "xQuery": "ウ軍 ドローンで空から負傷兵救出"
    },
    {
      "time": "18:36",
      "title": "ユニクロ ソックス3点990円終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599375?source=rss",
      "publishedAt": "2026-10-19T09:36:29.000Z",
      "xQuery": "ユニクロ ソックス3点990円終了へ"
    },
    {
      "time": "00:06",
      "title": "JAL便に小動物 サイズは猫以下か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599413?source=rss",
      "publishedAt": "2026-10-19T15:06:45.000Z",
      "xQuery": "JAL便に小動物 サイズは猫以下か"
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
