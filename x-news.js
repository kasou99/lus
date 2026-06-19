window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T05:17:18.133Z",
  "items": [
    {
      "time": "12:13",
      "title": "米類3年半ぶり下落 5月消費者物価",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584814?source=rss",
      "publishedAt": "2026-06-19T03:13:25.000Z",
      "xQuery": "米類3年半ぶり下落 5月消費者物価"
    },
    {
      "time": "13:16",
      "title": "心停止ドナーから心臓移植 検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584826?source=rss",
      "publishedAt": "2026-06-19T04:16:11.000Z",
      "xQuery": "心停止ドナーから心臓移植 検討"
    },
    {
      "time": "14:14",
      "title": "小学校火災 ストーブから発火か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584830?source=rss",
      "publishedAt": "2026-06-19T05:14:18.000Z",
      "xQuery": "小学校火災 ストーブから発火か"
    },
    {
      "time": "13:07",
      "title": "日本へ団体旅行 中国で再開の動き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584825?source=rss",
      "publishedAt": "2026-06-19T04:07:23.000Z",
      "xQuery": "日本へ団体旅行 中国で再開の動き"
    },
    {
      "time": "13:22",
      "title": "日清 カップ焼きそば28万個回収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584828?source=rss",
      "publishedAt": "2026-06-19T04:22:40.000Z",
      "xQuery": "日清 カップ焼きそば28万個回収"
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
