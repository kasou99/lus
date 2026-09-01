window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T05:18:47.070Z",
  "items": [
    {
      "time": "12:42",
      "title": "長期金利一時3% 30年ぶり高水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593841?source=rss",
      "publishedAt": "2026-09-01T03:42:42.000Z",
      "xQuery": "長期金利一時3% 30年ぶり高水準"
    },
    {
      "time": "12:33",
      "title": "防災の日 政府が震度7想定し訓練",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593839?source=rss",
      "publishedAt": "2026-09-01T03:33:52.000Z",
      "xQuery": "防災の日 政府が震度7想定し訓練"
    },
    {
      "time": "11:34",
      "title": "台風24号発生 週後半は大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593833?source=rss",
      "publishedAt": "2026-09-01T02:34:13.000Z",
      "xQuery": "台風24号発生 週後半は大雨の恐れ"
    },
    {
      "time": "12:47",
      "title": "ネパール 遺体の身元特定が難航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593840?source=rss",
      "publishedAt": "2026-09-01T03:47:59.000Z",
      "xQuery": "ネパール 遺体の身元特定が難航"
    },
    {
      "time": "13:01",
      "title": "USJ拡張 市有地3ha賃貸で協議へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593842?source=rss",
      "publishedAt": "2026-09-01T04:01:38.000Z",
      "xQuery": "USJ拡張 市有地3ha賃貸で協議へ"
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
