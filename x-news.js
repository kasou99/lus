window.LUS_X_NEWS = {
  "updatedAt": "2026-11-28T12:15:05.550Z",
  "items": [
    {
      "time": "19:00",
      "title": "防衛費5年「60兆円弱」米側は難色",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604325?source=rss",
      "publishedAt": "2026-11-28T10:00:38.000Z",
      "xQuery": "防衛費5年「60兆円弱」米側は難色"
    },
    {
      "time": "18:04",
      "title": "大学病院 老朽化トラブル相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604318?source=rss",
      "publishedAt": "2026-11-28T09:04:01.000Z",
      "xQuery": "大学病院 老朽化トラブル相次ぐ"
    },
    {
      "time": "20:28",
      "title": "PL学園全校 28年度生徒募集休止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604329?source=rss",
      "publishedAt": "2026-11-28T11:28:33.000Z",
      "xQuery": "PL学園全校 28年度生徒募集休止"
    },
    {
      "time": "20:55",
      "title": "大槻義彦氏が死去 早大名誉教授",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604332?source=rss",
      "publishedAt": "2026-11-28T11:55:53.000Z",
      "xQuery": "大槻義彦氏が死去 早大名誉教授"
    },
    {
      "time": "15:15",
      "title": "寺で無許可ダンスバトル 法的には",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604300?source=rss",
      "publishedAt": "2026-11-28T06:15:53.000Z",
      "xQuery": "寺で無許可ダンスバトル 法的には"
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
