window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T14:17:38.830Z",
  "items": [
    {
      "time": "22:29",
      "title": "立憲系結集頓挫 泉氏ら入党見送り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595746?source=rss",
      "publishedAt": "2026-09-18T13:29:40.000Z",
      "xQuery": "立憲系結集頓挫 泉氏ら入党見送り"
    },
    {
      "time": "22:43",
      "title": "日販 Anthropicに書籍大量販売か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595748?source=rss",
      "publishedAt": "2026-09-18T13:43:22.000Z",
      "xQuery": "日販 Anthropicに書籍大量販売か"
    },
    {
      "time": "15:37",
      "title": "ジャガイモ輸入解禁加速を 米要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595701?source=rss",
      "publishedAt": "2026-09-18T06:37:04.000Z",
      "xQuery": "ジャガイモ輸入解禁加速を 米要請"
    },
    {
      "time": "18:00",
      "title": "今年は暖冬予想 エルニーニョ続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595720?source=rss",
      "publishedAt": "2026-09-18T09:00:23.000Z",
      "xQuery": "今年は暖冬予想 エルニーニョ続く"
    },
    {
      "time": "21:10",
      "title": "交番で夫殺され 崩れた幸せな日々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595737?source=rss",
      "publishedAt": "2026-09-18T12:10:16.000Z",
      "xQuery": "交番で夫殺され 崩れた幸せな日々"
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
