window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T15:54:57.853Z",
  "items": [
    {
      "time": "22:20",
      "title": "イラン報復休止 米軍攻撃停止受け",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589421?source=rss",
      "publishedAt": "2026-07-26T13:20:03.000Z",
      "xQuery": "イラン報復休止 米軍攻撃停止受け"
    },
    {
      "time": "20:49",
      "title": "強気貫く首相国会運営 身内も異論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589414?source=rss",
      "publishedAt": "2026-07-26T11:49:12.000Z",
      "xQuery": "強気貫く首相国会運営 身内も異論"
    },
    {
      "time": "19:58",
      "title": "遺伝子治療で中国6歳死亡 調査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589407?source=rss",
      "publishedAt": "2026-07-26T10:58:10.000Z",
      "xQuery": "遺伝子治療で中国6歳死亡 調査へ"
    },
    {
      "time": "22:15",
      "title": "半年で70kg減量 体はボロボロに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589425?source=rss",
      "publishedAt": "2026-07-26T13:15:47.000Z",
      "xQuery": "半年で70kg減量 体はボロボロに"
    },
    {
      "time": "21:13",
      "title": "小学生に「スクイーズ」人気 なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589416?source=rss",
      "publishedAt": "2026-07-26T12:13:33.000Z",
      "xQuery": "小学生に「スクイーズ」人気 なぜ"
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
