window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T07:31:53.767Z",
  "items": [
    {
      "time": "13:53",
      "title": "27日 ダブル台風が関東に直撃か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585745?source=rss",
      "publishedAt": "2026-06-26T04:53:51.000Z",
      "xQuery": "27日 ダブル台風が関東に直撃か"
    },
    {
      "time": "16:12",
      "title": "JR東あす一部の特急や在来線運休",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585754?source=rss",
      "publishedAt": "2026-06-26T07:12:27.000Z",
      "xQuery": "JR東あす一部の特急や在来線運休"
    },
    {
      "time": "16:11",
      "title": "東証終値3005円安 下げ幅史上3位",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585755?source=rss",
      "publishedAt": "2026-06-26T07:11:37.000Z",
      "xQuery": "東証終値3005円安 下げ幅史上3位"
    },
    {
      "time": "15:25",
      "title": "陸自で感染USB使用 小泉氏が説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585750?source=rss",
      "publishedAt": "2026-06-26T06:25:52.000Z",
      "xQuery": "陸自で感染USB使用 小泉氏が説明"
    },
    {
      "time": "16:07",
      "title": "ゴーン氏 ‌復帰求める声に言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585756?source=rss",
      "publishedAt": "2026-06-26T07:07:46.000Z",
      "xQuery": "ゴーン氏 ‌復帰求める声に言及"
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
