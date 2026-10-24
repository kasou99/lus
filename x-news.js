window.LUS_X_NEWS = {
  "updatedAt": "2026-10-24T22:37:35.108Z",
  "items": [
    {
      "time": "07:35",
      "title": "台風 26日にかけ警報級の大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599995?source=rss",
      "publishedAt": "2026-10-24T22:35:53.000Z",
      "xQuery": "台風 26日にかけ警報級の大雨恐れ"
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
      "time": "07:27",
      "title": "GMO不正接続 一瞬で119万円消失",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599992?source=rss",
      "publishedAt": "2026-10-24T22:27:48.000Z",
      "xQuery": "GMO不正接続 一瞬で119万円消失"
    },
    {
      "time": "21:55",
      "title": "外来カミキリ被害拡大の恐れ 試算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599980?source=rss",
      "publishedAt": "2026-10-24T12:55:48.000Z",
      "xQuery": "外来カミキリ被害拡大の恐れ 試算"
    },
    {
      "time": "23:54",
      "title": "放獣したツキノワグマが再び出没",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599990?source=rss",
      "publishedAt": "2026-10-24T14:54:37.000Z",
      "xQuery": "放獣したツキノワグマが再び出没"
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
