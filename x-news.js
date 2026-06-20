window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T03:49:10.475Z",
  "items": [
    {
      "time": "12:10",
      "title": "防衛省が異例投稿 攻めの発信に舵",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584934?source=rss",
      "publishedAt": "2026-06-20T03:10:51.000Z",
      "xQuery": "防衛省が異例投稿 攻めの発信に舵"
    },
    {
      "time": "11:40",
      "title": "米FRBが利上げ予想に転換 経緯は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584928?source=rss",
      "publishedAt": "2026-06-20T02:40:24.000Z",
      "xQuery": "米FRBが利上げ予想に転換 経緯は"
    },
    {
      "time": "10:16",
      "title": "小池都知事が給与半減を終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584918?source=rss",
      "publishedAt": "2026-06-20T01:16:32.000Z",
      "xQuery": "小池都知事が給与半減を終了へ"
    },
    {
      "time": "10:46",
      "title": "「閉じられない広告」法的見解は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584923?source=rss",
      "publishedAt": "2026-06-20T01:46:43.000Z",
      "xQuery": "「閉じられない広告」法的見解は"
    },
    {
      "time": "11:58",
      "title": "DFハキミ 性的暴行容疑で裁判へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584932?source=rss",
      "publishedAt": "2026-06-20T02:58:36.000Z",
      "xQuery": "DFハキミ 性的暴行容疑で裁判へ"
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
