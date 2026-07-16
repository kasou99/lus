window.LUS_X_NEWS = {
  "updatedAt": "2026-07-16T04:34:52.689Z",
  "items": [
    {
      "time": "12:02",
      "title": "各地猛烈な暑さ 午前に37℃観測も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588131?source=rss",
      "publishedAt": "2026-07-16T03:02:14.000Z",
      "xQuery": "各地猛烈な暑さ 午前に37℃観測も"
    },
    {
      "time": "12:19",
      "title": "公用車のNHK受信料 免除要請へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588134?source=rss",
      "publishedAt": "2026-07-16T03:19:35.000Z",
      "xQuery": "公用車のNHK受信料 免除要請へ"
    },
    {
      "time": "11:42",
      "title": "一部クレカで決済できず 障害か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588129?source=rss",
      "publishedAt": "2026-07-16T02:42:28.000Z",
      "xQuery": "一部クレカで決済できず 障害か"
    },
    {
      "time": "12:33",
      "title": "2人死亡 長男殺害疑いで父再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588135?source=rss",
      "publishedAt": "2026-07-16T03:33:13.000Z",
      "xQuery": "2人死亡 長男殺害疑いで父再逮捕"
    },
    {
      "time": "12:07",
      "title": "登校中はねられ小3死亡 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588133?source=rss",
      "publishedAt": "2026-07-16T03:07:17.000Z",
      "xQuery": "登校中はねられ小3死亡 男を逮捕"
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
