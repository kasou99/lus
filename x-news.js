window.LUS_X_NEWS = {
  "updatedAt": "2026-08-20T12:49:00.459Z",
  "items": [
    {
      "time": "19:53",
      "title": "北朝鮮の対日批判 激化の背景分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592447?source=rss",
      "publishedAt": "2026-08-20T10:53:17.000Z",
      "xQuery": "北朝鮮の対日批判 激化の背景分析"
    },
    {
      "time": "19:22",
      "title": "子2人の姿が土砂に消え 母の思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592443?source=rss",
      "publishedAt": "2026-08-20T10:22:08.000Z",
      "xQuery": "子2人の姿が土砂に消え 母の思い"
    },
    {
      "time": "20:24",
      "title": "列車に接触し4人死亡 身元判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592450?source=rss",
      "publishedAt": "2026-08-20T11:24:44.000Z",
      "xQuery": "列車に接触し4人死亡 身元判明"
    },
    {
      "time": "18:42",
      "title": "富士山6合目 1人でいた7歳を救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592439?source=rss",
      "publishedAt": "2026-08-20T09:42:07.000Z",
      "xQuery": "富士山6合目 1人でいた7歳を救助"
    },
    {
      "time": "19:51",
      "title": "メガネにコスメ的な機能 各社注力",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592448?source=rss",
      "publishedAt": "2026-08-20T10:51:26.000Z",
      "xQuery": "メガネにコスメ的な機能 各社注力"
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
