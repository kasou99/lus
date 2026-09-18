window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T18:41:10.861Z",
  "items": [
    {
      "time": "21:50",
      "title": "コメ価格2年ぶり2000円台 懸念も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595741?source=rss",
      "publishedAt": "2026-09-18T12:50:41.000Z",
      "xQuery": "コメ価格2年ぶり2000円台 懸念も"
    },
    {
      "time": "22:43",
      "title": "日販 Anthropicに書籍大量販売か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595748?source=rss",
      "publishedAt": "2026-09-18T13:43:22.000Z",
      "xQuery": "日販 Anthropicに書籍大量販売か"
    },
    {
      "time": "22:53",
      "title": "中道への交付金「納得」11% 読売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595749?source=rss",
      "publishedAt": "2026-09-18T13:53:11.000Z",
      "xQuery": "中道への交付金「納得」11% 読売"
    },
    {
      "time": "23:43",
      "title": "新米1トンパックの下敷きに 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595753?source=rss",
      "publishedAt": "2026-09-18T14:43:06.000Z",
      "xQuery": "新米1トンパックの下敷きに 死亡"
    },
    {
      "time": "21:10",
      "title": "交番で夫殺され 崩れた幸せな日々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595737?source=rss",
      "publishedAt": "2026-09-18T12:10:16.000Z",
      "xQuery": "交番で夫殺され 崩れた幸せな日々"
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
