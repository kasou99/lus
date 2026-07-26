window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T08:19:46.685Z",
  "items": [
    {
      "time": "16:33",
      "title": "やまゆり園事件10年 多くの人献花",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589387?source=rss",
      "publishedAt": "2026-07-26T07:33:44.000Z",
      "xQuery": "やまゆり園事件10年 多くの人献花"
    },
    {
      "time": "16:12",
      "title": "ホンダ日産の次世代車 日産OS軸",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589384?source=rss",
      "publishedAt": "2026-07-26T07:12:14.000Z",
      "xQuery": "ホンダ日産の次世代車 日産OS軸"
    },
    {
      "time": "14:09",
      "title": "親子ら3人海に流され父死亡 茨城",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589375?source=rss",
      "publishedAt": "2026-07-26T05:09:38.000Z",
      "xQuery": "親子ら3人海に流され父死亡 茨城"
    },
    {
      "time": "16:43",
      "title": "ゴルフ場でカートから転落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589389?source=rss",
      "publishedAt": "2026-07-26T07:43:42.000Z",
      "xQuery": "ゴルフ場でカートから転落 死亡"
    },
    {
      "time": "16:26",
      "title": "結婚相談所「お見合い」実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589385?source=rss",
      "publishedAt": "2026-07-26T07:26:09.000Z",
      "xQuery": "結婚相談所「お見合い」実態は"
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
