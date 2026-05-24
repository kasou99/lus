window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T23:54:42.581Z",
  "items": [
    {
      "time": "08:12",
      "title": "ナフサ説明「納得せず」64% 読売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581559?source=rss",
      "publishedAt": "2026-05-24T23:12:54.000Z",
      "xQuery": "ナフサ説明「納得せず」64% 読売"
    },
    {
      "time": "08:23",
      "title": "単身高齢者の最期 自治体の重荷に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581560?source=rss",
      "publishedAt": "2026-05-24T23:23:42.000Z",
      "xQuery": "単身高齢者の最期 自治体の重荷に"
    },
    {
      "time": "07:49",
      "title": "不正会計のニデック 監視委検査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581556?source=rss",
      "publishedAt": "2026-05-24T22:49:33.000Z",
      "xQuery": "不正会計のニデック 監視委検査へ"
    },
    {
      "time": "07:56",
      "title": "バイクと車が正面衝突 高校生重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581558?source=rss",
      "publishedAt": "2026-05-24T22:56:45.000Z",
      "xQuery": "バイクと車が正面衝突 高校生重体"
    },
    {
      "time": "06:27",
      "title": "住宅に3人遺体 目立った外傷なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581548?source=rss",
      "publishedAt": "2026-05-24T21:27:28.000Z",
      "xQuery": "住宅に3人遺体 目立った外傷なし"
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
