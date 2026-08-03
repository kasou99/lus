window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T07:43:07.945Z",
  "items": [
    {
      "time": "16:25",
      "title": "自民 食料品の消費減税を大筋了承",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590386?source=rss",
      "publishedAt": "2026-08-03T07:25:58.000Z",
      "xQuery": "自民 食料品の消費減税を大筋了承"
    },
    {
      "time": "15:38",
      "title": "爆発で従業員犠牲 危機管理の盲点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590354?source=rss",
      "publishedAt": "2026-08-03T06:38:36.000Z",
      "xQuery": "爆発で従業員犠牲 危機管理の盲点"
    },
    {
      "time": "14:29",
      "title": "イオン爆発 雑貨店幹部が指示謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590376?source=rss",
      "publishedAt": "2026-08-03T05:29:52.000Z",
      "xQuery": "イオン爆発 雑貨店幹部が指示謝罪"
    },
    {
      "time": "16:15",
      "title": "スーチー氏 赤十字関係者と面会",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590383?source=rss",
      "publishedAt": "2026-08-03T07:15:12.000Z",
      "xQuery": "スーチー氏 赤十字関係者と面会"
    },
    {
      "time": "15:33",
      "title": "ポケカ マイナ使用の本人認証導入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590381?source=rss",
      "publishedAt": "2026-08-03T06:33:39.000Z",
      "xQuery": "ポケカ マイナ使用の本人認証導入"
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
