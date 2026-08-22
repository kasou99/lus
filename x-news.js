window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T03:47:36.712Z",
  "items": [
    {
      "time": "12:13",
      "title": "智弁和歌山 5年ぶり4度目の優勝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592639?source=rss",
      "publishedAt": "2026-08-22T03:13:20.000Z",
      "xQuery": "智弁和歌山 5年ぶり4度目の優勝"
    },
    {
      "time": "12:33",
      "title": "秋田県職員の懲戒処分 妥当性検証",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592637?source=rss",
      "publishedAt": "2026-08-22T03:33:36.000Z",
      "xQuery": "秋田県職員の懲戒処分 妥当性検証"
    },
    {
      "time": "10:14",
      "title": "TikTokが636億円支払いで和解 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592620?source=rss",
      "publishedAt": "2026-08-22T01:14:18.000Z",
      "xQuery": "TikTokが636億円支払いで和解 米"
    },
    {
      "time": "11:29",
      "title": "長期休み「子どもと出勤」広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592633?source=rss",
      "publishedAt": "2026-08-22T02:29:49.000Z",
      "xQuery": "長期休み「子どもと出勤」広がる"
    },
    {
      "time": "10:54",
      "title": "「味の素」広報にAI 炎上の本質",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592628?source=rss",
      "publishedAt": "2026-08-22T01:54:18.000Z",
      "xQuery": "「味の素」広報にAI 炎上の本質"
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
