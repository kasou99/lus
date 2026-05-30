window.LUS_X_NEWS = {
  "updatedAt": "2026-05-30T23:55:28.540Z",
  "items": [
    {
      "time": "07:27",
      "title": "台風 1日から強い勢力で沖縄接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582358?source=rss",
      "publishedAt": "2026-05-30T22:27:05.000Z",
      "xQuery": "台風 1日から強い勢力で沖縄接近"
    },
    {
      "time": "08:04",
      "title": "初診・再診料など 6月〜引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582366?source=rss",
      "publishedAt": "2026-05-30T23:04:17.000Z",
      "xQuery": "初診・再診料など 6月〜引き上げ"
    },
    {
      "time": "07:42",
      "title": "国境なき医師団 エボラ巡り警鐘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582361?source=rss",
      "publishedAt": "2026-05-30T22:42:32.000Z",
      "xQuery": "国境なき医師団 エボラ巡り警鐘"
    },
    {
      "time": "07:41",
      "title": "2人死亡 直前にバス運転85歳異変",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582362?source=rss",
      "publishedAt": "2026-05-30T22:41:34.000Z",
      "xQuery": "2人死亡 直前にバス運転85歳異変"
    },
    {
      "time": "08:00",
      "title": "大学の0円朝食 どんなメニュー",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582364?source=rss",
      "publishedAt": "2026-05-30T23:00:05.000Z",
      "xQuery": "大学の0円朝食 どんなメニュー"
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
