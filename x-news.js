window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T01:13:01.918Z",
  "items": [
    {
      "time": "08:48",
      "title": "首相の国会出席削減 自民が議論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603632?source=rss",
      "publishedAt": "2026-11-22T23:48:06.000Z",
      "xQuery": "首相の国会出席削減 自民が議論"
    },
    {
      "time": "09:25",
      "title": "リビアで露軍艦爆発 無人機攻撃か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603637?source=rss",
      "publishedAt": "2026-11-23T00:25:34.000Z",
      "xQuery": "リビアで露軍艦爆発 無人機攻撃か"
    },
    {
      "time": "09:08",
      "title": "死亡事故受け 柏崎刈羽で工事中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603635?source=rss",
      "publishedAt": "2026-11-23T00:08:57.000Z",
      "xQuery": "死亡事故受け 柏崎刈羽で工事中止"
    },
    {
      "time": "08:50",
      "title": "中央分離帯越え車と衝突 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603634?source=rss",
      "publishedAt": "2026-11-22T23:50:34.000Z",
      "xQuery": "中央分離帯越え車と衝突 男を逮捕"
    },
    {
      "time": "09:20",
      "title": "「ほぼ日手帳」海外で人気のワケ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603636?source=rss",
      "publishedAt": "2026-11-23T00:20:14.000Z",
      "xQuery": "「ほぼ日手帳」海外で人気のワケ"
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
