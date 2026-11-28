window.LUS_X_NEWS = {
  "updatedAt": "2026-11-28T10:10:29.231Z",
  "items": [
    {
      "time": "18:04",
      "title": "大学病院 老朽化トラブル相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604318?source=rss",
      "publishedAt": "2026-11-28T09:04:01.000Z",
      "xQuery": "大学病院 老朽化トラブル相次ぐ"
    },
    {
      "time": "16:56",
      "title": "米空軍のシステムに不正侵入 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604311?source=rss",
      "publishedAt": "2026-11-28T07:56:12.000Z",
      "xQuery": "米空軍のシステムに不正侵入 報道"
    },
    {
      "time": "17:25",
      "title": "拘束記者の妻手記 露で相次ぎ報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604316?source=rss",
      "publishedAt": "2026-11-28T08:25:58.000Z",
      "xQuery": "拘束記者の妻手記 露で相次ぎ報道"
    },
    {
      "time": "17:08",
      "title": "「一生結婚しない」が2割超 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604313?source=rss",
      "publishedAt": "2026-11-28T08:08:43.000Z",
      "xQuery": "「一生結婚しない」が2割超 背景"
    },
    {
      "time": "16:52",
      "title": "書店がYouTube 10分で4千冊完売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604312?source=rss",
      "publishedAt": "2026-11-28T07:52:07.000Z",
      "xQuery": "書店がYouTube 10分で4千冊完売"
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
