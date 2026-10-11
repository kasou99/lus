window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T23:40:59.001Z",
  "items": [
    {
      "time": "08:30",
      "title": "台風29号で高波 海のレジャー注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598458?source=rss",
      "publishedAt": "2026-10-11T23:30:15.000Z",
      "xQuery": "台風29号で高波 海のレジャー注意"
    },
    {
      "time": "07:56",
      "title": "米ウ首脳 露軽油の制裁緩和で応酬",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598451?source=rss",
      "publishedAt": "2026-10-11T22:56:33.000Z",
      "xQuery": "米ウ首脳 露軽油の制裁緩和で応酬"
    },
    {
      "time": "07:35",
      "title": "モトクロスバイク3台転倒 2人骨折",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598450?source=rss",
      "publishedAt": "2026-10-11T22:35:46.000Z",
      "xQuery": "モトクロスバイク3台転倒 2人骨折"
    },
    {
      "time": "07:56",
      "title": "マツタケ狩りの男性 滑落し死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598454?source=rss",
      "publishedAt": "2026-10-11T22:56:11.000Z",
      "xQuery": "マツタケ狩りの男性 滑落し死亡"
    },
    {
      "time": "20:08",
      "title": "玄関先でクマに襲われる 眼球破裂",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598416?source=rss",
      "publishedAt": "2026-10-11T11:08:01.000Z",
      "xQuery": "玄関先でクマに襲われる 眼球破裂"
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
