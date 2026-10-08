window.LUS_X_NEWS = {
  "updatedAt": "2026-10-08T14:20:11.419Z",
  "items": [
    {
      "time": "22:55",
      "title": "在沖縄米軍 9日まで通常訓練停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598059?source=rss",
      "publishedAt": "2026-10-08T13:55:00.000Z",
      "xQuery": "在沖縄米軍 9日まで通常訓練停止"
    },
    {
      "time": "23:02",
      "title": "参院幹事長の交代 自民議員が批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598060?source=rss",
      "publishedAt": "2026-10-08T14:02:27.000Z",
      "xQuery": "参院幹事長の交代 自民議員が批判"
    },
    {
      "time": "22:30",
      "title": "ロシア ICC所長らの引き渡し要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598055?source=rss",
      "publishedAt": "2026-10-08T13:30:01.000Z",
      "xQuery": "ロシア ICC所長らの引き渡し要求"
    },
    {
      "time": "22:00",
      "title": "ローソン 約215万件の情報漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598056?source=rss",
      "publishedAt": "2026-10-08T13:00:36.000Z",
      "xQuery": "ローソン 約215万件の情報漏えい"
    },
    {
      "time": "18:16",
      "title": "3COINS成長鈍化 脱マンネリ急ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598025?source=rss",
      "publishedAt": "2026-10-08T09:16:28.000Z",
      "xQuery": "3COINS成長鈍化 脱マンネリ急ぐ"
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
