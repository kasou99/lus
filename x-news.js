window.LUS_X_NEWS = {
  "updatedAt": "2026-08-18T22:41:09.164Z",
  "items": [
    {
      "time": "06:42",
      "title": "九州～東海で猛暑日続出か 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592232?source=rss",
      "publishedAt": "2026-08-18T21:42:17.000Z",
      "xQuery": "九州～東海で猛暑日続出か 警戒を"
    },
    {
      "time": "06:58",
      "title": "豪雨の路上車両600台 撤去へ連携",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592233?source=rss",
      "publishedAt": "2026-08-18T21:58:37.000Z",
      "xQuery": "豪雨の路上車両600台 撤去へ連携"
    },
    {
      "time": "06:25",
      "title": "ICC赤根所長らを制裁対象に 米国",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592231?source=rss",
      "publishedAt": "2026-08-18T21:25:46.000Z",
      "xQuery": "ICC赤根所長らを制裁対象に 米国"
    },
    {
      "time": "21:42",
      "title": "ロシアが日本大使呼び出し抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592218?source=rss",
      "publishedAt": "2026-08-18T12:42:17.000Z",
      "xQuery": "ロシアが日本大使呼び出し抗議"
    },
    {
      "time": "07:29",
      "title": "ディズニーとABC 米当局を提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592234?source=rss",
      "publishedAt": "2026-08-18T22:29:25.000Z",
      "xQuery": "ディズニーとABC 米当局を提訴"
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
