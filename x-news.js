window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T00:50:32.737Z",
  "items": [
    {
      "time": "08:40",
      "title": "財務相 さらなる協調介入躊躇せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590337?source=rss",
      "publishedAt": "2026-08-02T23:40:39.000Z",
      "xQuery": "財務相 さらなる協調介入躊躇せず"
    },
    {
      "time": "08:52",
      "title": "3日は熊本40℃予想 九州で酷暑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590336?source=rss",
      "publishedAt": "2026-08-02T23:52:05.000Z",
      "xQuery": "3日は熊本40℃予想 九州で酷暑"
    },
    {
      "time": "09:16",
      "title": "マレーシア首相 難民巡る発言物議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590339?source=rss",
      "publishedAt": "2026-08-03T00:16:07.000Z",
      "xQuery": "マレーシア首相 難民巡る発言物議"
    },
    {
      "time": "09:22",
      "title": "熊本地震で転倒が原因か 16歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590341?source=rss",
      "publishedAt": "2026-08-03T00:22:19.000Z",
      "xQuery": "熊本地震で転倒が原因か 16歳死亡"
    },
    {
      "time": "09:41",
      "title": "路面電車の下敷きになり死亡 函館",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590342?source=rss",
      "publishedAt": "2026-08-03T00:41:35.000Z",
      "xQuery": "路面電車の下敷きになり死亡 函館"
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
