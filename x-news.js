window.LUS_X_NEWS = {
  "updatedAt": "2026-07-17T13:36:34.079Z",
  "items": [
    {
      "time": "21:36",
      "title": "英与党 新党首にバーナム氏を選出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588332?source=rss",
      "publishedAt": "2026-07-17T12:36:20.000Z",
      "xQuery": "英与党 新党首にバーナム氏を選出"
    },
    {
      "time": "20:23",
      "title": "首相 皇室典範巡り蓮舫氏に苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588322?source=rss",
      "publishedAt": "2026-07-17T11:23:43.000Z",
      "xQuery": "首相 皇室典範巡り蓮舫氏に苦言"
    },
    {
      "time": "21:10",
      "title": "園児ら64人食中毒 八王子の保育園",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588330?source=rss",
      "publishedAt": "2026-07-17T12:10:22.000Z",
      "xQuery": "園児ら64人食中毒 八王子の保育園"
    },
    {
      "time": "20:26",
      "title": "ハウスメーカー倒産 9割増の衝撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588324?source=rss",
      "publishedAt": "2026-07-17T11:26:22.000Z",
      "xQuery": "ハウスメーカー倒産 9割増の衝撃"
    },
    {
      "time": "19:29",
      "title": "ジャズピアニスト渋谷毅さん死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588312?source=rss",
      "publishedAt": "2026-07-17T10:29:53.000Z",
      "xQuery": "ジャズピアニスト渋谷毅さん死去"
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
