window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T16:12:50.817Z",
  "items": [
    {
      "time": "22:42",
      "title": "日中首脳会談 実現への調整不調",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602093?source=rss",
      "publishedAt": "2026-11-10T13:42:28.000Z",
      "xQuery": "日中首脳会談 実現への調整不調"
    },
    {
      "time": "21:24",
      "title": "米・露・ウの協議 9カ月ぶり再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602085?source=rss",
      "publishedAt": "2026-11-10T12:24:04.000Z",
      "xQuery": "米・露・ウの協議 9カ月ぶり再開"
    },
    {
      "time": "23:38",
      "title": "タマホーム社員 保険金を不正請求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602099?source=rss",
      "publishedAt": "2026-11-10T14:38:31.000Z",
      "xQuery": "タマホーム社員 保険金を不正請求"
    },
    {
      "time": "20:39",
      "title": "スマホ遠隔操作し詐欺疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602082?source=rss",
      "publishedAt": "2026-11-10T11:39:05.000Z",
      "xQuery": "スマホ遠隔操作し詐欺疑い 逮捕"
    },
    {
      "time": "23:12",
      "title": "もう終わりやで 明石ダコ深刻不漁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602095?source=rss",
      "publishedAt": "2026-11-10T14:12:10.000Z",
      "xQuery": "もう終わりやで 明石ダコ深刻不漁"
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
