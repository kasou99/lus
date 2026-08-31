window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T08:27:41.889Z",
  "items": [
    {
      "time": "15:48",
      "title": "核ごみ文献調査 常陸大宮市に打診",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593749?source=rss",
      "publishedAt": "2026-08-31T06:48:38.000Z",
      "xQuery": "核ごみ文献調査 常陸大宮市に打診"
    },
    {
      "time": "16:00",
      "title": "世田谷女性殺害 拘禁刑20年を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593750?source=rss",
      "publishedAt": "2026-08-31T07:00:52.000Z",
      "xQuery": "世田谷女性殺害 拘禁刑20年を求刑"
    },
    {
      "time": "16:58",
      "title": "火葬大国・日本 土葬希望する思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593751?source=rss",
      "publishedAt": "2026-08-31T07:58:35.000Z",
      "xQuery": "火葬大国・日本 土葬希望する思い"
    },
    {
      "time": "16:45",
      "title": "ネパール 900人発電所閉じ込めか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593755?source=rss",
      "publishedAt": "2026-08-31T07:45:14.000Z",
      "xQuery": "ネパール 900人発電所閉じ込めか"
    },
    {
      "time": "16:37",
      "title": "東証は小反落 米利上げ観測が重荷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593756?source=rss",
      "publishedAt": "2026-08-31T07:37:25.000Z",
      "xQuery": "東証は小反落 米利上げ観測が重荷"
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
