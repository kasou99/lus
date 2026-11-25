window.LUS_X_NEWS = {
  "updatedAt": "2026-11-25T02:37:13.717Z",
  "items": [
    {
      "time": "11:28",
      "title": "日経平均 一時2000円超値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603901?source=rss",
      "publishedAt": "2026-11-25T02:28:04.000Z",
      "xQuery": "日経平均 一時2000円超値下がり"
    },
    {
      "time": "09:18",
      "title": "首相が文科相擁護 辞任ドミノ懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603876?source=rss",
      "publishedAt": "2026-11-25T00:18:57.000Z",
      "xQuery": "首相が文科相擁護 辞任ドミノ懸念"
    },
    {
      "time": "08:17",
      "title": "住宅で流血の女性が死亡 殺人か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603869?source=rss",
      "publishedAt": "2026-11-24T23:17:49.000Z",
      "xQuery": "住宅で流血の女性が死亡 殺人か"
    },
    {
      "time": "10:56",
      "title": "マツダ本社工場にイノシシ 捜索中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603891?source=rss",
      "publishedAt": "2026-11-25T01:56:14.000Z",
      "xQuery": "マツダ本社工場にイノシシ 捜索中"
    },
    {
      "time": "10:22",
      "title": "中国の宇宙船 初の外国人乗組員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603886?source=rss",
      "publishedAt": "2026-11-25T01:22:17.000Z",
      "xQuery": "中国の宇宙船 初の外国人乗組員"
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
