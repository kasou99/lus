window.LUS_X_NEWS = {
  "updatedAt": "2026-10-01T01:01:17.854Z",
  "items": [
    {
      "time": "08:44",
      "title": "農相 地元自治体の予算カット発言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597135?source=rss",
      "publishedAt": "2026-09-30T23:44:32.000Z",
      "xQuery": "農相 地元自治体の予算カット発言"
    },
    {
      "time": "08:38",
      "title": "首相の所信表明演説 原案が判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597134?source=rss",
      "publishedAt": "2026-09-30T23:38:27.000Z",
      "xQuery": "首相の所信表明演説 原案が判明"
    },
    {
      "time": "09:53",
      "title": "NTT東西 固定電話の通話料値上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597140?source=rss",
      "publishedAt": "2026-10-01T00:53:03.000Z",
      "xQuery": "NTT東西 固定電話の通話料値上げ"
    },
    {
      "time": "08:21",
      "title": "トヨタ 祝日勤務の業界慣行見直し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597133?source=rss",
      "publishedAt": "2026-09-30T23:21:00.000Z",
      "xQuery": "トヨタ 祝日勤務の業界慣行見直し"
    },
    {
      "time": "09:31",
      "title": "飼い犬発見し車外へ はねられ重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597137?source=rss",
      "publishedAt": "2026-10-01T00:31:21.000Z",
      "xQuery": "飼い犬発見し車外へ はねられ重体"
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
