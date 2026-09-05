window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T21:12:55.923Z",
  "items": [
    {
      "time": "20:15",
      "title": "西-東日本 警報級大雨が続く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594342?source=rss",
      "publishedAt": "2026-09-05T11:15:09.000Z",
      "xQuery": "西-東日本 警報級大雨が続く恐れ"
    },
    {
      "time": "23:41",
      "title": "ネパール土石流から10日 2人救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594363?source=rss",
      "publishedAt": "2026-09-05T14:41:12.000Z",
      "xQuery": "ネパール土石流から10日 2人救助"
    },
    {
      "time": "19:29",
      "title": "29年に中低所得者へ現金給付検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594335?source=rss",
      "publishedAt": "2026-09-05T10:29:58.000Z",
      "xQuery": "29年に中低所得者へ現金給付検討"
    },
    {
      "time": "06:08",
      "title": "ケーキ店で放火か 2人死亡3人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594367?source=rss",
      "publishedAt": "2026-09-05T21:08:16.000Z",
      "xQuery": "ケーキ店で放火か 2人死亡3人搬送"
    },
    {
      "time": "00:30",
      "title": "悠仁さま20歳 成年皇族の歩み進め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594366?source=rss",
      "publishedAt": "2026-09-05T15:30:05.000Z",
      "xQuery": "悠仁さま20歳 成年皇族の歩み進め"
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
