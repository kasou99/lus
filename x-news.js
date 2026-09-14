window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T04:23:00.559Z",
  "items": [
    {
      "time": "12:07",
      "title": "中部電力 データ不正で調査報告書",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595243?source=rss",
      "publishedAt": "2026-09-14T03:07:05.000Z",
      "xQuery": "中部電力 データ不正で調査報告書"
    },
    {
      "time": "11:39",
      "title": "高市首相 沖縄新知事と「連携」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595234?source=rss",
      "publishedAt": "2026-09-14T02:39:36.000Z",
      "xQuery": "高市首相 沖縄新知事と「連携」"
    },
    {
      "time": "11:47",
      "title": "AI巡る懸念 トランプ氏は重視せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595235?source=rss",
      "publishedAt": "2026-09-14T02:47:14.000Z",
      "xQuery": "AI巡る懸念 トランプ氏は重視せず"
    },
    {
      "time": "12:46",
      "title": "ANA機とタラップ車接触 福岡空港",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595248?source=rss",
      "publishedAt": "2026-09-14T03:46:47.000Z",
      "xQuery": "ANA機とタラップ車接触 福岡空港"
    },
    {
      "time": "12:36",
      "title": "ダウン症の子6年の生涯 CMに反響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595245?source=rss",
      "publishedAt": "2026-09-14T03:36:35.000Z",
      "xQuery": "ダウン症の子6年の生涯 CMに反響"
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
