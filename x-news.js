window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T09:19:19.218Z",
  "items": [
    {
      "time": "15:54",
      "title": "東証終値3318円安 3番目の下げ幅",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598878?source=rss",
      "publishedAt": "2026-10-15T06:54:08.000Z",
      "xQuery": "東証終値3318円安 3番目の下げ幅"
    },
    {
      "time": "16:38",
      "title": "台風発生 年間30個到達は13年ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598882?source=rss",
      "publishedAt": "2026-10-15T07:38:07.000Z",
      "xQuery": "台風発生 年間30個到達は13年ぶり"
    },
    {
      "time": "17:00",
      "title": "バスと車が衝突 5歳が意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598884?source=rss",
      "publishedAt": "2026-10-15T08:00:02.000Z",
      "xQuery": "バスと車が衝突 5歳が意識不明"
    },
    {
      "time": "18:13",
      "title": "神戸・三宮4人死傷事故 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598897?source=rss",
      "publishedAt": "2026-10-15T09:13:06.000Z",
      "xQuery": "神戸・三宮4人死傷事故 男を逮捕"
    },
    {
      "time": "17:55",
      "title": "バーガーキング 約1118万件漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598889?source=rss",
      "publishedAt": "2026-10-15T08:55:02.000Z",
      "xQuery": "バーガーキング 約1118万件漏えい"
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
