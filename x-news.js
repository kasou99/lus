window.LUS_X_NEWS = {
  "updatedAt": "2026-09-06T00:54:55.332Z",
  "items": [
    {
      "time": "08:39",
      "title": "東海や関東 滝のような雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594381?source=rss",
      "publishedAt": "2026-09-05T23:39:32.000Z",
      "xQuery": "東海や関東 滝のような雨の恐れ"
    },
    {
      "time": "08:17",
      "title": "米軍 イランのタンカー3隻攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594378?source=rss",
      "publishedAt": "2026-09-05T23:17:27.000Z",
      "xQuery": "米軍 イランのタンカー3隻攻撃"
    },
    {
      "time": "07:42",
      "title": "露大統領 和平担当の米特使と会談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594371?source=rss",
      "publishedAt": "2026-09-05T22:42:09.000Z",
      "xQuery": "露大統領 和平担当の米特使と会談"
    },
    {
      "time": "08:31",
      "title": "ケーキ店火災 人が刺されたと通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594380?source=rss",
      "publishedAt": "2026-09-05T23:31:35.000Z",
      "xQuery": "ケーキ店火災 人が刺されたと通報"
    },
    {
      "time": "08:09",
      "title": "乗っていた車の下敷きか 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594377?source=rss",
      "publishedAt": "2026-09-05T23:09:24.000Z",
      "xQuery": "乗っていた車の下敷きか 男性死亡"
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
