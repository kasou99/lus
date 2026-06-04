window.LUS_X_NEWS = {
  "updatedAt": "2026-06-04T00:08:39.473Z",
  "items": [
    {
      "time": "08:22",
      "title": "補正予算案 異例のスピード成立へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582869?source=rss",
      "publishedAt": "2026-06-03T23:22:53.000Z",
      "xQuery": "補正予算案 異例のスピード成立へ"
    },
    {
      "time": "08:14",
      "title": "天安門事件37年 中国は追悼を抑圧",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582866?source=rss",
      "publishedAt": "2026-06-03T23:14:38.000Z",
      "xQuery": "天安門事件37年 中国は追悼を抑圧"
    },
    {
      "time": "08:03",
      "title": "ヤマダHDとEDION 経営統合の方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582867?source=rss",
      "publishedAt": "2026-06-03T23:03:23.000Z",
      "xQuery": "ヤマダHDとEDION 経営統合の方針"
    },
    {
      "time": "06:30",
      "title": "たつの市遺体 指名手配の男と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582858?source=rss",
      "publishedAt": "2026-06-03T21:30:23.000Z",
      "xQuery": "たつの市遺体 指名手配の男と判明"
    },
    {
      "time": "07:35",
      "title": "4人襲い居座ったクマ 外に逃げる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582862?source=rss",
      "publishedAt": "2026-06-03T22:35:37.000Z",
      "xQuery": "4人襲い居座ったクマ 外に逃げる"
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
