window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T14:52:28.388Z",
  "items": [
    {
      "time": "22:26",
      "title": "8日から各地で「かなりの高温」か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586524?source=rss",
      "publishedAt": "2026-07-02T13:26:13.000Z",
      "xQuery": "8日から各地で「かなりの高温」か"
    },
    {
      "time": "23:15",
      "title": "ハンタ集団感染 WHOが収束宣言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586531?source=rss",
      "publishedAt": "2026-07-02T14:15:35.000Z",
      "xQuery": "ハンタ集団感染 WHOが収束宣言"
    },
    {
      "time": "22:29",
      "title": "小学校火災 ストーブも私物と教員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586526?source=rss",
      "publishedAt": "2026-07-02T13:29:46.000Z",
      "xQuery": "小学校火災 ストーブも私物と教員"
    },
    {
      "time": "23:29",
      "title": "タイで11歳運転の車暴走 9人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586532?source=rss",
      "publishedAt": "2026-07-02T14:29:30.000Z",
      "xQuery": "タイで11歳運転の車暴走 9人死亡"
    },
    {
      "time": "22:00",
      "title": "ブルボン 菓子2万袋を自主回収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586521?source=rss",
      "publishedAt": "2026-07-02T13:00:04.000Z",
      "xQuery": "ブルボン 菓子2万袋を自主回収"
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
