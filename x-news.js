window.LUS_X_NEWS = {
  "updatedAt": "2026-05-28T23:00:15.415Z",
  "items": [
    {
      "time": "06:22",
      "title": "米イラン合意 米大統領の承認待ち",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582099?source=rss",
      "publishedAt": "2026-05-28T21:22:59.000Z",
      "xQuery": "米イラン合意 米大統領の承認待ち"
    },
    {
      "time": "06:43",
      "title": "3メガ銀 OpenAI新型モデル活用へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582101?source=rss",
      "publishedAt": "2026-05-28T21:43:04.000Z",
      "xQuery": "3メガ銀 OpenAI新型モデル活用へ"
    },
    {
      "time": "07:12",
      "title": "栃木強殺 出国の男が隠語で勧誘か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582103?source=rss",
      "publishedAt": "2026-05-28T22:12:22.000Z",
      "xQuery": "栃木強殺 出国の男が隠語で勧誘か"
    },
    {
      "time": "06:10",
      "title": "トヨタ 次世代EVの開発を中止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582098?source=rss",
      "publishedAt": "2026-05-28T21:10:31.000Z",
      "xQuery": "トヨタ 次世代EVの開発を中止へ"
    },
    {
      "time": "07:35",
      "title": "カンボジア名誉領事 資金申告漏れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582107?source=rss",
      "publishedAt": "2026-05-28T22:35:50.000Z",
      "xQuery": "カンボジア名誉領事 資金申告漏れ"
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
