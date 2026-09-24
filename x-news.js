window.LUS_X_NEWS = {
  "updatedAt": "2026-09-24T22:37:14.722Z",
  "items": [
    {
      "time": "06:52",
      "title": "台風26号 強い勢力で沖縄に接近へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596432?source=rss",
      "publishedAt": "2026-09-24T21:52:57.000Z",
      "xQuery": "台風26号 強い勢力で沖縄に接近へ"
    },
    {
      "time": "06:36",
      "title": "習氏 米に台湾独立への反対求める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596431?source=rss",
      "publishedAt": "2026-09-24T21:36:38.000Z",
      "xQuery": "習氏 米に台湾独立への反対求める"
    },
    {
      "time": "07:11",
      "title": "北海道で今季全国初 氷点下を観測",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596433?source=rss",
      "publishedAt": "2026-09-24T22:11:47.000Z",
      "xQuery": "北海道で今季全国初 氷点下を観測"
    },
    {
      "time": "06:07",
      "title": "パンダ2頭近く米へ到着 習氏発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596428?source=rss",
      "publishedAt": "2026-09-24T21:07:05.000Z",
      "xQuery": "パンダ2頭近く米へ到着 習氏発表"
    },
    {
      "time": "21:42",
      "title": "崖崩落で死亡 夫が過去に対応要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596413?source=rss",
      "publishedAt": "2026-09-24T12:42:39.000Z",
      "xQuery": "崖崩落で死亡 夫が過去に対応要求"
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
