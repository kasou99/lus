window.LUS_X_NEWS = {
  "updatedAt": "2026-07-03T04:48:11.902Z",
  "items": [
    {
      "time": "12:20",
      "title": "半年ぶりの休養 ウ東部で兵士交代",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586569?source=rss",
      "publishedAt": "2026-07-03T03:20:10.000Z",
      "xQuery": "半年ぶりの休養 ウ東部で兵士交代"
    },
    {
      "time": "10:58",
      "title": "円の「買う力」40年で半分程度に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586561?source=rss",
      "publishedAt": "2026-07-03T01:58:32.000Z",
      "xQuery": "円の「買う力」40年で半分程度に"
    },
    {
      "time": "12:34",
      "title": "永住許可手数料 1万円→20万円に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586573?source=rss",
      "publishedAt": "2026-07-03T03:34:10.000Z",
      "xQuery": "永住許可手数料 1万円→20万円に"
    },
    {
      "time": "12:48",
      "title": "似た人いる 手配犯逮捕きっかけに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586575?source=rss",
      "publishedAt": "2026-07-03T03:48:37.000Z",
      "xQuery": "似た人いる 手配犯逮捕きっかけに"
    },
    {
      "time": "12:00",
      "title": "セブンイレブンがナイキ提訴 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586565?source=rss",
      "publishedAt": "2026-07-03T03:00:07.000Z",
      "xQuery": "セブンイレブンがナイキ提訴 米"
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
