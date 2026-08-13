window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T03:52:52.648Z",
  "items": [
    {
      "time": "12:13",
      "title": "プーチン大統領 北方領土を初訪問",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591560?source=rss",
      "publishedAt": "2026-08-13T03:13:10.000Z",
      "xQuery": "プーチン大統領 北方領土を初訪問"
    },
    {
      "time": "11:36",
      "title": "バブル・氷河期・Z 各世代の働く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591554?source=rss",
      "publishedAt": "2026-08-13T02:36:06.000Z",
      "xQuery": "バブル・氷河期・Z 各世代の働く"
    },
    {
      "time": "12:34",
      "title": "横浜市長 議会でパワハラを謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591563?source=rss",
      "publishedAt": "2026-08-13T03:34:56.000Z",
      "xQuery": "横浜市長 議会でパワハラを謝罪"
    },
    {
      "time": "11:41",
      "title": "流星群の観測ツアー参加者 滑落か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591550?source=rss",
      "publishedAt": "2026-08-13T02:41:29.000Z",
      "xQuery": "流星群の観測ツアー参加者 滑落か"
    },
    {
      "time": "08:29",
      "title": "スシロー&くら寿司 次の成長戦略",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591525?source=rss",
      "publishedAt": "2026-08-12T23:29:24.000Z",
      "xQuery": "スシロー&くら寿司 次の成長戦略"
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
