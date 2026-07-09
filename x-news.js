window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T00:56:23.598Z",
  "items": [
    {
      "time": "09:17",
      "title": "九州で37℃予想 万全な暑さ対策を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587258?source=rss",
      "publishedAt": "2026-07-09T00:17:25.000Z",
      "xQuery": "九州で37℃予想 万全な暑さ対策を"
    },
    {
      "time": "08:32",
      "title": "ロシア ディーゼル燃料の輸出禁止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587253?source=rss",
      "publishedAt": "2026-07-08T23:32:37.000Z",
      "xQuery": "ロシア ディーゼル燃料の輸出禁止"
    },
    {
      "time": "09:18",
      "title": "重体の0歳死亡 トラックと車衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587259?source=rss",
      "publishedAt": "2026-07-09T00:18:14.000Z",
      "xQuery": "重体の0歳死亡 トラックと車衝突"
    },
    {
      "time": "07:32",
      "title": "快活CLUBアプリ攻撃疑い18歳逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587243?source=rss",
      "publishedAt": "2026-07-08T22:32:24.000Z",
      "xQuery": "快活CLUBアプリ攻撃疑い18歳逮捕"
    },
    {
      "time": "08:10",
      "title": "ポケモン空港のグッズ 高額転売も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587251?source=rss",
      "publishedAt": "2026-07-08T23:10:39.000Z",
      "xQuery": "ポケモン空港のグッズ 高額転売も"
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
