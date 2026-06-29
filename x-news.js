window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T15:17:41.462Z",
  "items": [
    {
      "time": "23:42",
      "title": "NY円 一時39年半ぶりの円安水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586160?source=rss",
      "publishedAt": "2026-06-29T14:42:31.000Z",
      "xQuery": "NY円 一時39年半ぶりの円安水準"
    },
    {
      "time": "22:12",
      "title": "なぜうちが 中国禁輸拡大に戸惑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586152?source=rss",
      "publishedAt": "2026-06-29T13:12:10.000Z",
      "xQuery": "なぜうちが 中国禁輸拡大に戸惑い"
    },
    {
      "time": "19:43",
      "title": "八田容疑者を目撃 半数近くが関東",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586135?source=rss",
      "publishedAt": "2026-06-29T10:43:08.000Z",
      "xQuery": "八田容疑者を目撃 半数近くが関東"
    },
    {
      "time": "23:57",
      "title": "児童139人がおう吐や下痢 足立区",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586161?source=rss",
      "publishedAt": "2026-06-29T14:57:39.000Z",
      "xQuery": "児童139人がおう吐や下痢 足立区"
    },
    {
      "time": "22:59",
      "title": "客が乗務員室で機器触る 近鉄釈明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586157?source=rss",
      "publishedAt": "2026-06-29T13:59:51.000Z",
      "xQuery": "客が乗務員室で機器触る 近鉄釈明"
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
