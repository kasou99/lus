window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T08:35:38.162Z",
  "items": [
    {
      "time": "16:21",
      "title": "週後半 日本海側で暴風・大雪恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602679?source=rss",
      "publishedAt": "2026-11-15T07:21:09.000Z",
      "xQuery": "週後半 日本海側で暴風・大雪恐れ"
    },
    {
      "time": "15:33",
      "title": "SpaceX 宇宙船空中回収に初成功",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602675?source=rss",
      "publishedAt": "2026-11-15T06:33:11.000Z",
      "xQuery": "SpaceX 宇宙船空中回収に初成功"
    },
    {
      "time": "16:45",
      "title": "青森死亡ひき逃げ 新たに男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602686?source=rss",
      "publishedAt": "2026-11-15T07:45:34.000Z",
      "xQuery": "青森死亡ひき逃げ 新たに男を逮捕"
    },
    {
      "time": "16:14",
      "title": "タマホーム 架空請求を売上計上か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602678?source=rss",
      "publishedAt": "2026-11-15T07:14:52.000Z",
      "xQuery": "タマホーム 架空請求を売上計上か"
    },
    {
      "time": "15:24",
      "title": "豊洲の公園にポケカ袋が散乱 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602672?source=rss",
      "publishedAt": "2026-11-15T06:24:54.000Z",
      "xQuery": "豊洲の公園にポケカ袋が散乱 波紋"
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
