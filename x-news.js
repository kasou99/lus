window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T07:35:36.148Z",
  "items": [
    {
      "time": "15:29",
      "title": "首里城正殿 完成祝うテープカット",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603553?source=rss",
      "publishedAt": "2026-11-22T06:29:31.000Z",
      "xQuery": "首里城正殿 完成祝うテープカット"
    },
    {
      "time": "16:18",
      "title": "福島の大雪 滞在者ら孤立状態解消",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603560?source=rss",
      "publishedAt": "2026-11-22T07:18:07.000Z",
      "xQuery": "福島の大雪 滞在者ら孤立状態解消"
    },
    {
      "time": "16:31",
      "title": "益永死刑囚が死亡 連続企業爆破",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603563?source=rss",
      "publishedAt": "2026-11-22T07:31:35.000Z",
      "xQuery": "益永死刑囚が死亡 連続企業爆破"
    },
    {
      "time": "14:33",
      "title": "12歳男子中学生が行方不明 郡山市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603546?source=rss",
      "publishedAt": "2026-11-22T05:33:04.000Z",
      "xQuery": "12歳男子中学生が行方不明 郡山市"
    },
    {
      "time": "15:36",
      "title": "「夜職」相次ぐ海外入国トラブル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603554?source=rss",
      "publishedAt": "2026-11-22T06:36:19.000Z",
      "xQuery": "「夜職」相次ぐ海外入国トラブル"
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
