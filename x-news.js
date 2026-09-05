window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T03:40:19.406Z",
  "items": [
    {
      "time": "11:41",
      "title": "屋久島町 土砂災害危険警報に切替",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594286?source=rss",
      "publishedAt": "2026-09-05T02:41:18.000Z",
      "xQuery": "屋久島町 土砂災害危険警報に切替"
    },
    {
      "time": "09:19",
      "title": "イラン戦争 米政権から矮小化発言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594272?source=rss",
      "publishedAt": "2026-09-05T00:19:45.000Z",
      "xQuery": "イラン戦争 米政権から矮小化発言"
    },
    {
      "time": "12:12",
      "title": "性被害訴える検事 なぜ無念の退職",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594287?source=rss",
      "publishedAt": "2026-09-05T03:12:23.000Z",
      "xQuery": "性被害訴える検事 なぜ無念の退職"
    },
    {
      "time": "09:03",
      "title": "ニデック不正 利益至上主義が浸透",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594268?source=rss",
      "publishedAt": "2026-09-05T00:03:04.000Z",
      "xQuery": "ニデック不正 利益至上主義が浸透"
    },
    {
      "time": "11:03",
      "title": "ソフトクリーム? 新種の化石発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594281?source=rss",
      "publishedAt": "2026-09-05T02:03:51.000Z",
      "xQuery": "ソフトクリーム? 新種の化石発見"
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
