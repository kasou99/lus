window.LUS_X_NEWS = {
  "updatedAt": "2026-11-13T23:35:01.119Z",
  "items": [
    {
      "time": "07:01",
      "title": "全米空港に航空機の地上待機命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602483?source=rss",
      "publishedAt": "2026-11-13T22:01:07.000Z",
      "xQuery": "全米空港に航空機の地上待機命令"
    },
    {
      "time": "07:59",
      "title": "米で遊覧船とタンカーが衝突 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602491?source=rss",
      "publishedAt": "2026-11-13T22:59:22.000Z",
      "xQuery": "米で遊覧船とタンカーが衝突 報道"
    },
    {
      "time": "07:28",
      "title": "マネックス証券 免許証画像流出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602486?source=rss",
      "publishedAt": "2026-11-13T22:28:18.000Z",
      "xQuery": "マネックス証券 免許証画像流出か"
    },
    {
      "time": "07:37",
      "title": "MS「復旧が進み、安定した状態」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602492?source=rss",
      "publishedAt": "2026-11-13T22:37:15.000Z",
      "xQuery": "MS「復旧が進み、安定した状態」"
    },
    {
      "time": "07:48",
      "title": "2人死亡ひき逃げ事故 49歳を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602496?source=rss",
      "publishedAt": "2026-11-13T22:48:26.000Z",
      "xQuery": "2人死亡ひき逃げ事故 49歳を逮捕"
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
