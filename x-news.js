window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T01:33:48.695Z",
  "items": [
    {
      "time": "09:37",
      "title": "ICC制裁巡り自民議員「米が怖い」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593098?source=rss",
      "publishedAt": "2026-08-26T00:37:00.000Z",
      "xQuery": "ICC制裁巡り自民議員「米が怖い」"
    },
    {
      "time": "07:18",
      "title": "米CIA長官が訪露 和平協議目的か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593085?source=rss",
      "publishedAt": "2026-08-25T22:18:11.000Z",
      "xQuery": "米CIA長官が訪露 和平協議目的か"
    },
    {
      "time": "07:43",
      "title": "4人死亡 見張り員所定位置おらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593087?source=rss",
      "publishedAt": "2026-08-25T22:43:18.000Z",
      "xQuery": "4人死亡 見張り員所定位置おらず"
    },
    {
      "time": "10:21",
      "title": "「強盗」はウソ 窃盗疑いで女逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593103?source=rss",
      "publishedAt": "2026-08-26T01:21:13.000Z",
      "xQuery": "「強盗」はウソ 窃盗疑いで女逮捕"
    },
    {
      "time": "09:05",
      "title": "ジムニー対抗車 他社が作らない訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593096?source=rss",
      "publishedAt": "2026-08-26T00:05:42.000Z",
      "xQuery": "ジムニー対抗車 他社が作らない訳"
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
