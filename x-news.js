window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T10:24:32.049Z",
  "items": [
    {
      "time": "17:25",
      "title": "九州道 8月後半には通行可能に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590514?source=rss",
      "publishedAt": "2026-08-04T08:25:00.000Z",
      "xQuery": "九州道 8月後半には通行可能に"
    },
    {
      "time": "17:57",
      "title": "台風13号「迷走」可能性 進路注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590524?source=rss",
      "publishedAt": "2026-08-04T08:57:56.000Z",
      "xQuery": "台風13号「迷走」可能性 進路注意"
    },
    {
      "time": "17:42",
      "title": "デンマーク新兵役制度 20%が女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590516?source=rss",
      "publishedAt": "2026-08-04T08:42:37.000Z",
      "xQuery": "デンマーク新兵役制度 20%が女性"
    },
    {
      "time": "17:29",
      "title": "終了した「104」今もかける60代母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590515?source=rss",
      "publishedAt": "2026-08-04T08:29:36.000Z",
      "xQuery": "終了した「104」今もかける60代母"
    },
    {
      "time": "18:49",
      "title": "小学館 社長ら26人が報酬返納",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590528?source=rss",
      "publishedAt": "2026-08-04T09:49:41.000Z",
      "xQuery": "小学館 社長ら26人が報酬返納"
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
