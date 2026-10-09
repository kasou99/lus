window.LUS_X_NEWS = {
  "updatedAt": "2026-10-09T13:45:06.991Z",
  "items": [
    {
      "time": "22:13",
      "title": "個人情報巡る対策 政府が緊急要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598186?source=rss",
      "publishedAt": "2026-10-09T13:13:04.000Z",
      "xQuery": "個人情報巡る対策 政府が緊急要請"
    },
    {
      "time": "21:19",
      "title": "簗氏「国交省にやらせる」 24年に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598180?source=rss",
      "publishedAt": "2026-10-09T12:19:46.000Z",
      "xQuery": "簗氏「国交省にやらせる」 24年に"
    },
    {
      "time": "20:28",
      "title": "屋外授業で女児死亡 父親が市提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598176?source=rss",
      "publishedAt": "2026-10-09T11:28:41.000Z",
      "xQuery": "屋外授業で女児死亡 父親が市提訴"
    },
    {
      "time": "21:39",
      "title": "採石場で落石 トラックの男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598183?source=rss",
      "publishedAt": "2026-10-09T12:39:43.000Z",
      "xQuery": "採石場で落石 トラックの男性死亡"
    },
    {
      "time": "22:29",
      "title": "白菜高騰「鍋できない」と客困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598187?source=rss",
      "publishedAt": "2026-10-09T13:29:23.000Z",
      "xQuery": "白菜高騰「鍋できない」と客困惑"
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
