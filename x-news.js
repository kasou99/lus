window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T13:11:13.727Z",
  "items": [
    {
      "time": "21:24",
      "title": "米・露・ウの協議 9カ月ぶり再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602085?source=rss",
      "publishedAt": "2026-11-10T12:24:04.000Z",
      "xQuery": "米・露・ウの協議 9カ月ぶり再開"
    },
    {
      "time": "20:01",
      "title": "安保3文書 民間力強化を明記へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602079?source=rss",
      "publishedAt": "2026-11-10T11:01:34.000Z",
      "xQuery": "安保3文書 民間力強化を明記へ"
    },
    {
      "time": "20:44",
      "title": "自民・小渕氏ら 税調副会長を辞任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602083?source=rss",
      "publishedAt": "2026-11-10T11:44:04.000Z",
      "xQuery": "自民・小渕氏ら 税調副会長を辞任"
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
      "time": "19:57",
      "title": "関電が作業服を刷新 ビームス監修",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602078?source=rss",
      "publishedAt": "2026-11-10T10:57:49.000Z",
      "xQuery": "関電が作業服を刷新 ビームス監修"
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
