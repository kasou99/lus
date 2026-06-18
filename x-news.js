window.LUS_X_NEWS = {
  "updatedAt": "2026-06-18T00:01:08.070Z",
  "items": [
    {
      "time": "08:55",
      "title": "米イラン首脳が覚書に電子署名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584670?source=rss",
      "publishedAt": "2026-06-17T23:55:48.000Z",
      "xQuery": "米イラン首脳が覚書に電子署名"
    },
    {
      "time": "08:19",
      "title": "日銀利上げ 利払い増に中小は苦悩",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584668?source=rss",
      "publishedAt": "2026-06-17T23:19:38.000Z",
      "xQuery": "日銀利上げ 利払い増に中小は苦悩"
    },
    {
      "time": "08:05",
      "title": "匿流に標的情報「案件屋」提供か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584666?source=rss",
      "publishedAt": "2026-06-17T23:05:16.000Z",
      "xQuery": "匿流に標的情報「案件屋」提供か"
    },
    {
      "time": "07:19",
      "title": "ミキサー車にひかれ男性死亡 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584659?source=rss",
      "publishedAt": "2026-06-17T22:19:18.000Z",
      "xQuery": "ミキサー車にひかれ男性死亡 逮捕"
    },
    {
      "time": "08:01",
      "title": "土砂崩れ住人の下半身埋まる 大分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584667?source=rss",
      "publishedAt": "2026-06-17T23:01:12.000Z",
      "xQuery": "土砂崩れ住人の下半身埋まる 大分"
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
