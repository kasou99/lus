window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T07:36:14.463Z",
  "items": [
    {
      "time": "14:33",
      "title": "熊本城13日に再開「復興の力に」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591191?source=rss",
      "publishedAt": "2026-08-10T05:33:58.000Z",
      "xQuery": "熊本城13日に再開「復興の力に」"
    },
    {
      "time": "12:21",
      "title": "北朝鮮ハッカー AIツール開発か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591176?source=rss",
      "publishedAt": "2026-08-10T03:21:12.000Z",
      "xQuery": "北朝鮮ハッカー AIツール開発か"
    },
    {
      "time": "16:23",
      "title": "海で3人救助も2人死亡確認 新潟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591200?source=rss",
      "publishedAt": "2026-08-10T07:23:47.000Z",
      "xQuery": "海で3人救助も2人死亡確認 新潟"
    },
    {
      "time": "13:36",
      "title": "2年前に89歳女性殺害疑い 娘逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591184?source=rss",
      "publishedAt": "2026-08-10T04:36:43.000Z",
      "xQuery": "2年前に89歳女性殺害疑い 娘逮捕"
    },
    {
      "time": "16:03",
      "title": "ニチレイ個人情報 ハッカー公開か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591196?source=rss",
      "publishedAt": "2026-08-10T07:03:35.000Z",
      "xQuery": "ニチレイ個人情報 ハッカー公開か"
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
