window.LUS_X_NEWS = {
  "updatedAt": "2026-06-05T09:20:39.012Z",
  "items": [
    {
      "time": "17:43",
      "title": "7-8日再び災害級大雨か 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583060?source=rss",
      "publishedAt": "2026-06-05T08:43:20.000Z",
      "xQuery": "7-8日再び災害級大雨か 警戒を"
    },
    {
      "time": "16:21",
      "title": "衆院選1票の格差 「合憲」11件目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583050?source=rss",
      "publishedAt": "2026-06-05T07:21:10.000Z",
      "xQuery": "衆院選1票の格差 「合憲」11件目"
    },
    {
      "time": "17:33",
      "title": "大学生暴行死 女に無期懲役を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583059?source=rss",
      "publishedAt": "2026-06-05T08:33:20.000Z",
      "xQuery": "大学生暴行死 女に無期懲役を求刑"
    },
    {
      "time": "16:48",
      "title": "会社役員遺棄 山で遺体の一部発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583053?source=rss",
      "publishedAt": "2026-06-05T07:48:54.000Z",
      "xQuery": "会社役員遺棄 山で遺体の一部発見"
    },
    {
      "time": "15:41",
      "title": "ADHD治療「ゲーム」アプリ登場",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583046?source=rss",
      "publishedAt": "2026-06-05T06:41:13.000Z",
      "xQuery": "ADHD治療「ゲーム」アプリ登場"
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
