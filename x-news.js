window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T18:31:27.367Z",
  "items": [
    {
      "time": "20:45",
      "title": "露 最新式ミサイルでウ大規模攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581534?source=rss",
      "publishedAt": "2026-05-24T11:45:09.000Z",
      "xQuery": "露 最新式ミサイルでウ大規模攻撃"
    },
    {
      "time": "21:18",
      "title": "内閣支持率50%で発足後最低 毎日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581536?source=rss",
      "publishedAt": "2026-05-24T12:18:28.000Z",
      "xQuery": "内閣支持率50%で発足後最低 毎日"
    },
    {
      "time": "21:08",
      "title": "母娘殺害 容疑者は約10年前の隣人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581535?source=rss",
      "publishedAt": "2026-05-24T12:08:21.000Z",
      "xQuery": "母娘殺害 容疑者は約10年前の隣人"
    },
    {
      "time": "23:00",
      "title": "携帯キャリア次々乗り換え 問題は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581543?source=rss",
      "publishedAt": "2026-05-24T14:00:39.000Z",
      "xQuery": "携帯キャリア次々乗り換え 問題は"
    },
    {
      "time": "21:56",
      "title": "SNSで増 カラーハンティングとは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581539?source=rss",
      "publishedAt": "2026-05-24T12:56:48.000Z",
      "xQuery": "SNSで増 カラーハンティングとは"
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
