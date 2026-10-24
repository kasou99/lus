window.LUS_X_NEWS = {
  "updatedAt": "2026-10-24T13:14:24.406Z",
  "items": [
    {
      "time": "21:07",
      "title": "台風 西-東日本26日が雨ピークに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599973?source=rss",
      "publishedAt": "2026-10-24T12:07:36.000Z",
      "xQuery": "台風 西-東日本26日が雨ピークに"
    },
    {
      "time": "21:40",
      "title": "能動サイバー防御要請 政府側慎重",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599979?source=rss",
      "publishedAt": "2026-10-24T12:40:35.000Z",
      "xQuery": "能動サイバー防御要請 政府側慎重"
    },
    {
      "time": "20:39",
      "title": "中国で首相と会談 正恩氏日帰りか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599971?source=rss",
      "publishedAt": "2026-10-24T11:39:51.000Z",
      "xQuery": "中国で首相と会談 正恩氏日帰りか"
    },
    {
      "time": "21:02",
      "title": "モンゴル火災 当局が賠償請求検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599972?source=rss",
      "publishedAt": "2026-10-24T12:02:23.000Z",
      "xQuery": "モンゴル火災 当局が賠償請求検討"
    },
    {
      "time": "21:55",
      "title": "外来カミキリ被害拡大の恐れ 試算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599980?source=rss",
      "publishedAt": "2026-10-24T12:55:48.000Z",
      "xQuery": "外来カミキリ被害拡大の恐れ 試算"
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
