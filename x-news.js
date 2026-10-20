window.LUS_X_NEWS = {
  "updatedAt": "2026-10-20T10:40:41.439Z",
  "items": [
    {
      "time": "18:09",
      "title": "21日 東京・大阪などで真夏日予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599492?source=rss",
      "publishedAt": "2026-10-20T09:09:36.000Z",
      "xQuery": "21日 東京・大阪などで真夏日予想"
    },
    {
      "time": "18:31",
      "title": "米国防長官 ネタニヤフ首相と会談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599496?source=rss",
      "publishedAt": "2026-10-20T09:31:37.000Z",
      "xQuery": "米国防長官 ネタニヤフ首相と会談"
    },
    {
      "time": "19:27",
      "title": "小沢一郎氏「野党は泥船」と批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599500?source=rss",
      "publishedAt": "2026-10-20T10:27:38.000Z",
      "xQuery": "小沢一郎氏「野党は泥船」と批判"
    },
    {
      "time": "16:52",
      "title": "VW 給与上昇30年まで凍結検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599478?source=rss",
      "publishedAt": "2026-10-20T07:52:07.000Z",
      "xQuery": "VW 給与上昇30年まで凍結検討"
    },
    {
      "time": "18:24",
      "title": "旅客機内で目撃の「小動物」発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599494?source=rss",
      "publishedAt": "2026-10-20T09:24:43.000Z",
      "xQuery": "旅客機内で目撃の「小動物」発見"
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
