window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T23:29:23.867Z",
  "items": [
    {
      "time": "08:06",
      "title": "今季は台風多発 約2倍のペース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586545?source=rss",
      "publishedAt": "2026-07-02T23:06:25.000Z",
      "xQuery": "今季は台風多発 約2倍のペース"
    },
    {
      "time": "06:51",
      "title": "NY株が最高値 利上げ観測後退で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586538?source=rss",
      "publishedAt": "2026-07-02T21:51:36.000Z",
      "xQuery": "NY株が最高値 利上げ観測後退で"
    },
    {
      "time": "08:05",
      "title": "5歳不明「大雨と台風で捜索困難」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586543?source=rss",
      "publishedAt": "2026-07-02T23:05:34.000Z",
      "xQuery": "5歳不明「大雨と台風で捜索困難」"
    },
    {
      "time": "07:33",
      "title": "渋谷の危険盛り土 告発状を受理",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586540?source=rss",
      "publishedAt": "2026-07-02T22:33:58.000Z",
      "xQuery": "渋谷の危険盛り土 告発状を受理"
    },
    {
      "time": "06:22",
      "title": "村上春樹氏の新刊発売 深夜に行列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586536?source=rss",
      "publishedAt": "2026-07-02T21:22:15.000Z",
      "xQuery": "村上春樹氏の新刊発売 深夜に行列"
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
