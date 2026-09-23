window.LUS_X_NEWS = {
  "updatedAt": "2026-09-23T23:13:43.431Z",
  "items": [
    {
      "time": "07:26",
      "title": "習氏が米到着 トランプ氏が出迎え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596324?source=rss",
      "publishedAt": "2026-09-23T22:26:32.000Z",
      "xQuery": "習氏が米到着 トランプ氏が出迎え"
    },
    {
      "time": "06:38",
      "title": "露側 プーチン氏のG20出席検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596320?source=rss",
      "publishedAt": "2026-09-23T21:38:40.000Z",
      "xQuery": "露側 プーチン氏のG20出席検討"
    },
    {
      "time": "06:58",
      "title": "台風26号発生 26日には沖縄の南へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596321?source=rss",
      "publishedAt": "2026-09-23T21:58:17.000Z",
      "xQuery": "台風26号発生 26日には沖縄の南へ"
    },
    {
      "time": "08:05",
      "title": "会社役員刺され重体 従業員ら逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596326?source=rss",
      "publishedAt": "2026-09-23T23:05:02.000Z",
      "xQuery": "会社役員刺され重体 従業員ら逮捕"
    },
    {
      "time": "07:22",
      "title": "10年超不明の当時10歳未満 42人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596322?source=rss",
      "publishedAt": "2026-09-23T22:22:14.000Z",
      "xQuery": "10年超不明の当時10歳未満 42人"
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
