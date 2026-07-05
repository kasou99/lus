window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T11:13:04.175Z",
  "items": [
    {
      "time": "19:16",
      "title": "九州北部 土砂災害など厳重警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586836?source=rss",
      "publishedAt": "2026-07-05T10:16:06.000Z",
      "xQuery": "九州北部 土砂災害など厳重警戒を"
    },
    {
      "time": "16:50",
      "title": "安倍晋三氏をしのぶ会 昭恵氏謝辞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586818?source=rss",
      "publishedAt": "2026-07-05T07:50:36.000Z",
      "xQuery": "安倍晋三氏をしのぶ会 昭恵氏謝辞"
    },
    {
      "time": "18:40",
      "title": "石破氏 消費減税の財源巡り苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586832?source=rss",
      "publishedAt": "2026-07-05T09:40:24.000Z",
      "xQuery": "石破氏 消費減税の財源巡り苦言"
    },
    {
      "time": "19:57",
      "title": "温泉施設で5歳不明 手がかりなし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586842?source=rss",
      "publishedAt": "2026-07-05T10:57:44.000Z",
      "xQuery": "温泉施設で5歳不明 手がかりなし"
    },
    {
      "time": "18:29",
      "title": "AIと1日8時間超会話 男性の告白",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586831?source=rss",
      "publishedAt": "2026-07-05T09:29:33.000Z",
      "xQuery": "AIと1日8時間超会話 男性の告白"
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
