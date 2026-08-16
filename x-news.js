window.LUS_X_NEWS = {
  "updatedAt": "2026-08-16T22:39:26.610Z",
  "items": [
    {
      "time": "06:43",
      "title": "福岡県で震度4 津波の心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592009?source=rss",
      "publishedAt": "2026-08-16T21:43:37.000Z",
      "xQuery": "福岡県で震度4 津波の心配なし"
    },
    {
      "time": "07:20",
      "title": "トランプ氏 米韓軍事演習縮小指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592012?source=rss",
      "publishedAt": "2026-08-16T22:20:29.000Z",
      "xQuery": "トランプ氏 米韓軍事演習縮小指示"
    },
    {
      "time": "22:37",
      "title": "BBQ中に川に流され 20代女性重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592000?source=rss",
      "publishedAt": "2026-08-16T13:37:35.000Z",
      "xQuery": "BBQ中に川に流され 20代女性重体"
    },
    {
      "time": "07:26",
      "title": "福岡県議長 自民会派相談役外れる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592014?source=rss",
      "publishedAt": "2026-08-16T22:26:59.000Z",
      "xQuery": "福岡県議長 自民会派相談役外れる"
    },
    {
      "time": "00:00",
      "title": "オープンAI 経営幹部が相次ぎ退社",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592006?source=rss",
      "publishedAt": "2026-08-16T15:00:50.000Z",
      "xQuery": "オープンAI 経営幹部が相次ぎ退社"
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
