window.LUS_X_NEWS = {
  "updatedAt": "2026-11-06T00:30:44.855Z",
  "items": [
    {
      "time": "09:17",
      "title": "日経平均が大幅下落 6万円割れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601495?source=rss",
      "publishedAt": "2026-11-06T00:17:16.000Z",
      "xQuery": "日経平均が大幅下落 6万円割れ"
    },
    {
      "time": "08:22",
      "title": "経産省 中部電力に業務改善命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601489?source=rss",
      "publishedAt": "2026-11-05T23:22:48.000Z",
      "xQuery": "経産省 中部電力に業務改善命令"
    },
    {
      "time": "08:27",
      "title": "サイバー攻撃で強制遮断検討 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601490?source=rss",
      "publishedAt": "2026-11-05T23:27:17.000Z",
      "xQuery": "サイバー攻撃で強制遮断検討 政府"
    },
    {
      "time": "07:25",
      "title": "ドコモ通信障害が復旧 原因を公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601482?source=rss",
      "publishedAt": "2026-11-05T22:25:22.000Z",
      "xQuery": "ドコモ通信障害が復旧 原因を公表"
    },
    {
      "time": "08:36",
      "title": "大阪で物議「排除アート」問題は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601488?source=rss",
      "publishedAt": "2026-11-05T23:36:37.000Z",
      "xQuery": "大阪で物議「排除アート」問題は"
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
