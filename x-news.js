window.LUS_X_NEWS = {
  "updatedAt": "2026-07-29T22:23:56.787Z",
  "items": [
    {
      "time": "06:47",
      "title": "猛暑日続出 関東は天気急変の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589844?source=rss",
      "publishedAt": "2026-07-29T21:47:59.000Z",
      "xQuery": "猛暑日続出 関東は天気急変の恐れ"
    },
    {
      "time": "21:59",
      "title": "イオン社長「爆発想定しきれず」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589825?source=rss",
      "publishedAt": "2026-07-29T12:59:12.000Z",
      "xQuery": "イオン社長「爆発想定しきれず」"
    },
    {
      "time": "20:36",
      "title": "がれきから「助けて」緊迫の救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589817?source=rss",
      "publishedAt": "2026-07-29T11:36:52.000Z",
      "xQuery": "がれきから「助けて」緊迫の救助"
    },
    {
      "time": "06:19",
      "title": "イオン熊本で妻不明 案ずる夫と子",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589842?source=rss",
      "publishedAt": "2026-07-29T21:19:02.000Z",
      "xQuery": "イオン熊本で妻不明 案ずる夫と子"
    },
    {
      "time": "06:28",
      "title": "潰れた1階から「ここー」弟を救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589843?source=rss",
      "publishedAt": "2026-07-29T21:28:55.000Z",
      "xQuery": "潰れた1階から「ここー」弟を救出"
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
