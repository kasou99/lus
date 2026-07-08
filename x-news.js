window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T00:48:21.920Z",
  "items": [
    {
      "time": "09:40",
      "title": "台風9号が沖縄接近 早めの備えを",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587131?source=rss",
      "publishedAt": "2026-07-08T00:40:08.000Z",
      "xQuery": "台風9号が沖縄接近 早めの備えを"
    },
    {
      "time": "09:03",
      "title": "皇室典範改正案賛成せず 立憲調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587129?source=rss",
      "publishedAt": "2026-07-08T00:03:31.000Z",
      "xQuery": "皇室典範改正案賛成せず 立憲調整"
    },
    {
      "time": "23:15",
      "title": "穴開いた商船三井船 ホルムズ通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587112?source=rss",
      "publishedAt": "2026-07-07T14:15:16.000Z",
      "xQuery": "穴開いた商船三井船 ホルムズ通過"
    },
    {
      "time": "08:42",
      "title": "NY高層ビル崩落の恐れ 周辺避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587127?source=rss",
      "publishedAt": "2026-07-07T23:42:54.000Z",
      "xQuery": "NY高層ビル崩落の恐れ 周辺避難"
    },
    {
      "time": "09:31",
      "title": "障害ある弟の文字 姉がデザインに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587130?source=rss",
      "publishedAt": "2026-07-08T00:31:53.000Z",
      "xQuery": "障害ある弟の文字 姉がデザインに"
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
