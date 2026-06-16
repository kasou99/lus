window.LUS_X_NEWS = {
  "updatedAt": "2026-06-16T02:25:45.410Z",
  "items": [
    {
      "time": "10:38",
      "title": "米イラン 戦闘終結の覚書に署名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584424?source=rss",
      "publishedAt": "2026-06-16T01:38:56.000Z",
      "xQuery": "米イラン 戦闘終結の覚書に署名"
    },
    {
      "time": "09:43",
      "title": "食料品の消費減税 意見割れる自民",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584419?source=rss",
      "publishedAt": "2026-06-16T00:43:03.000Z",
      "xQuery": "食料品の消費減税 意見割れる自民"
    },
    {
      "time": "11:04",
      "title": "米でB52爆撃機墜落 乗員8人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584427?source=rss",
      "publishedAt": "2026-06-16T02:04:02.000Z",
      "xQuery": "米でB52爆撃機墜落 乗員8人死亡"
    },
    {
      "time": "08:04",
      "title": "スマホのシャッター音 見直しの声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584407?source=rss",
      "publishedAt": "2026-06-15T23:04:11.000Z",
      "xQuery": "スマホのシャッター音 見直しの声"
    },
    {
      "time": "10:02",
      "title": "「トビケラ」大群 悩む宇治市住民",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584421?source=rss",
      "publishedAt": "2026-06-16T01:02:58.000Z",
      "xQuery": "「トビケラ」大群 悩む宇治市住民"
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
