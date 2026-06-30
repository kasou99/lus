window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T10:40:17.706Z",
  "items": [
    {
      "time": "18:31",
      "title": "国産AI会社に3873億円支援 経産省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586255?source=rss",
      "publishedAt": "2026-06-30T09:31:50.000Z",
      "xQuery": "国産AI会社に3873億円支援 経産省"
    },
    {
      "time": "19:09",
      "title": "航空宇宙自衛隊 略称「空自」維持",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586260?source=rss",
      "publishedAt": "2026-06-30T10:09:12.000Z",
      "xQuery": "航空宇宙自衛隊 略称「空自」維持"
    },
    {
      "time": "18:35",
      "title": "33歳のとき夫突然死 喪失感に苦悩",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586256?source=rss",
      "publishedAt": "2026-06-30T09:35:39.000Z",
      "xQuery": "33歳のとき夫突然死 喪失感に苦悩"
    },
    {
      "time": "18:06",
      "title": "書類送検の長州小力さん 不起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586254?source=rss",
      "publishedAt": "2026-06-30T09:06:32.000Z",
      "xQuery": "書類送検の長州小力さん 不起訴"
    },
    {
      "time": "17:47",
      "title": "中年の約4割「睡眠で疲れ取れず」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586247?source=rss",
      "publishedAt": "2026-06-30T08:47:20.000Z",
      "xQuery": "中年の約4割「睡眠で疲れ取れず」"
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
