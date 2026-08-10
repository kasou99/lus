window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T00:57:41.020Z",
  "items": [
    {
      "time": "09:13",
      "title": "便乗犯罪 熊本の被災者に追い打ち",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591156?source=rss",
      "publishedAt": "2026-08-10T00:13:40.000Z",
      "xQuery": "便乗犯罪 熊本の被災者に追い打ち"
    },
    {
      "time": "07:38",
      "title": "不同意性交の認知件数 増加傾向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591146?source=rss",
      "publishedAt": "2026-08-09T22:38:11.000Z",
      "xQuery": "不同意性交の認知件数 増加傾向"
    },
    {
      "time": "07:49",
      "title": "身寄りのない死 膨らむ公費負担",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591147?source=rss",
      "publishedAt": "2026-08-09T22:49:07.000Z",
      "xQuery": "身寄りのない死 膨らむ公費負担"
    },
    {
      "time": "07:17",
      "title": "AI「暴走」自律的攻撃に米危機感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591142?source=rss",
      "publishedAt": "2026-08-09T22:17:32.000Z",
      "xQuery": "AI「暴走」自律的攻撃に米危機感"
    },
    {
      "time": "08:57",
      "title": "休暇中に会社の電話無視 法的には",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591154?source=rss",
      "publishedAt": "2026-08-09T23:57:49.000Z",
      "xQuery": "休暇中に会社の電話無視 法的には"
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
