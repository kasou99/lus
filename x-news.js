window.LUS_X_NEWS = {
  "updatedAt": "2026-10-06T07:25:01.637Z",
  "items": [
    {
      "time": "14:32",
      "title": "不明邦人捜索継続 ネパールに要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597751?source=rss",
      "publishedAt": "2026-10-06T05:32:09.000Z",
      "xQuery": "不明邦人捜索継続 ネパールに要請"
    },
    {
      "time": "14:01",
      "title": "AI政策の司令塔 米大統領なぜ設置",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597733?source=rss",
      "publishedAt": "2026-10-06T05:01:43.000Z",
      "xQuery": "AI政策の司令塔 米大統領なぜ設置"
    },
    {
      "time": "12:09",
      "title": "マスク氏 再び資産額1兆ドルに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597734?source=rss",
      "publishedAt": "2026-10-06T03:09:55.000Z",
      "xQuery": "マスク氏 再び資産額1兆ドルに"
    },
    {
      "time": "15:25",
      "title": "ピアニストの反田恭平氏 在宅起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597753?source=rss",
      "publishedAt": "2026-10-06T06:25:28.000Z",
      "xQuery": "ピアニストの反田恭平氏 在宅起訴"
    },
    {
      "time": "15:34",
      "title": "アシックス 失速から売上1兆円へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597754?source=rss",
      "publishedAt": "2026-10-06T06:34:29.000Z",
      "xQuery": "アシックス 失速から売上1兆円へ"
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
