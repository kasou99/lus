window.LUS_X_NEWS = {
  "updatedAt": "2026-10-05T13:25:57.235Z",
  "items": [
    {
      "time": "20:59",
      "title": "土石流の捜索打ち切り ネパール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597668?source=rss",
      "publishedAt": "2026-10-05T11:59:58.000Z",
      "xQuery": "土石流の捜索打ち切り ネパール"
    },
    {
      "time": "20:01",
      "title": "「没入型」新感覚の防災訓練 狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597660?source=rss",
      "publishedAt": "2026-10-05T11:01:40.000Z",
      "xQuery": "「没入型」新感覚の防災訓練 狙い"
    },
    {
      "time": "21:58",
      "title": "中国-北朝鮮の新大橋 近く開通か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597675?source=rss",
      "publishedAt": "2026-10-05T12:58:10.000Z",
      "xQuery": "中国-北朝鮮の新大橋 近く開通か"
    },
    {
      "time": "20:58",
      "title": "フジパン熊本工場 生産再開を断念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597666?source=rss",
      "publishedAt": "2026-10-05T11:58:26.000Z",
      "xQuery": "フジパン熊本工場 生産再開を断念"
    },
    {
      "time": "17:43",
      "title": "焼肉きんぐ 1078万人分の情報流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597644?source=rss",
      "publishedAt": "2026-10-05T08:43:10.000Z",
      "xQuery": "焼肉きんぐ 1078万人分の情報流出"
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
