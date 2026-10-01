window.LUS_X_NEWS = {
  "updatedAt": "2026-10-01T10:19:18.355Z",
  "items": [
    {
      "time": "18:44",
      "title": "ニデック 上場維持できるかが焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597183?source=rss",
      "publishedAt": "2026-10-01T09:44:22.000Z",
      "xQuery": "ニデック 上場維持できるかが焦点"
    },
    {
      "time": "17:50",
      "title": "フラット35 金利3.830%で過去最高",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597190?source=rss",
      "publishedAt": "2026-10-01T08:50:31.000Z",
      "xQuery": "フラット35 金利3.830%で過去最高"
    },
    {
      "time": "17:45",
      "title": "9月降水量 東日本で統計史上最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597188?source=rss",
      "publishedAt": "2026-10-01T08:45:27.000Z",
      "xQuery": "9月降水量 東日本で統計史上最多"
    },
    {
      "time": "16:58",
      "title": "交差点で事故 歩行者5人が重軽傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597181?source=rss",
      "publishedAt": "2026-10-01T07:58:11.000Z",
      "xQuery": "交差点で事故 歩行者5人が重軽傷"
    },
    {
      "time": "17:30",
      "title": "マック一部バーガー 北海道で休止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597187?source=rss",
      "publishedAt": "2026-10-01T08:30:23.000Z",
      "xQuery": "マック一部バーガー 北海道で休止"
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
