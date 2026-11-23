window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T06:27:35.002Z",
  "items": [
    {
      "time": "13:22",
      "title": "COP31閉幕 化石燃料を巡り対立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603661?source=rss",
      "publishedAt": "2026-11-23T04:22:01.000Z",
      "xQuery": "COP31閉幕 化石燃料を巡り対立"
    },
    {
      "time": "13:45",
      "title": "復元の首里城正殿 一般公開される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603663?source=rss",
      "publishedAt": "2026-11-23T04:45:16.000Z",
      "xQuery": "復元の首里城正殿 一般公開される"
    },
    {
      "time": "12:43",
      "title": "郡山市の中1不明 40人態勢で捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603658?source=rss",
      "publishedAt": "2026-11-23T03:43:12.000Z",
      "xQuery": "郡山市の中1不明 40人態勢で捜索"
    },
    {
      "time": "14:26",
      "title": "リフォーム工事業の倒産 過去最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603667?source=rss",
      "publishedAt": "2026-11-23T05:26:29.000Z",
      "xQuery": "リフォーム工事業の倒産 過去最多"
    },
    {
      "time": "15:15",
      "title": "番組中にわいせつな音 BBCが謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603674?source=rss",
      "publishedAt": "2026-11-23T06:15:44.000Z",
      "xQuery": "番組中にわいせつな音 BBCが謝罪"
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
