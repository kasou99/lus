window.LUS_X_NEWS = {
  "updatedAt": "2026-06-05T22:52:27.562Z",
  "items": [
    {
      "time": "07:10",
      "title": "飛鳥・藤原の宮都 世界遺産登録へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583118?source=rss",
      "publishedAt": "2026-06-05T22:10:05.000Z",
      "xQuery": "飛鳥・藤原の宮都 世界遺産登録へ"
    },
    {
      "time": "07:43",
      "title": "プーチン氏 ウ大統領との会談拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583123?source=rss",
      "publishedAt": "2026-06-05T22:43:20.000Z",
      "xQuery": "プーチン氏 ウ大統領との会談拒否"
    },
    {
      "time": "23:37",
      "title": "栃木強殺 益田容疑者を国際手配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583112?source=rss",
      "publishedAt": "2026-06-05T14:37:08.000Z",
      "xQuery": "栃木強殺 益田容疑者を国際手配"
    },
    {
      "time": "21:09",
      "title": "無期懲役求刑 被告の女表情変えず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583096?source=rss",
      "publishedAt": "2026-06-05T12:09:48.000Z",
      "xQuery": "無期懲役求刑 被告の女表情変えず"
    },
    {
      "time": "23:46",
      "title": "解体中の鉄塔が倒れ直撃 30代死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583113?source=rss",
      "publishedAt": "2026-06-05T14:46:39.000Z",
      "xQuery": "解体中の鉄塔が倒れ直撃 30代死亡"
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
