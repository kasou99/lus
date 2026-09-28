window.LUS_X_NEWS = {
  "updatedAt": "2026-09-28T22:17:44.187Z",
  "items": [
    {
      "time": "06:48",
      "title": "都心で34日連続雨 最長記録を更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596907?source=rss",
      "publishedAt": "2026-09-28T21:48:17.000Z",
      "xQuery": "都心で34日連続雨 最長記録を更新"
    },
    {
      "time": "21:32",
      "title": "衆院選制度見直し 10月末めど結論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596884?source=rss",
      "publishedAt": "2026-09-28T12:32:28.000Z",
      "xQuery": "衆院選制度見直し 10月末めど結論"
    },
    {
      "time": "06:41",
      "title": "マンション修繕談合 コンサル謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596906?source=rss",
      "publishedAt": "2026-09-28T21:41:02.000Z",
      "xQuery": "マンション修繕談合 コンサル謝罪"
    },
    {
      "time": "06:16",
      "title": "中国 首相の「台湾発言」是正要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596903?source=rss",
      "publishedAt": "2026-09-28T21:16:09.000Z",
      "xQuery": "中国 首相の「台湾発言」是正要求"
    },
    {
      "time": "00:37",
      "title": "車が停車中の車に追突 女性が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596899?source=rss",
      "publishedAt": "2026-09-28T15:37:22.000Z",
      "xQuery": "車が停車中の車に追突 女性が死亡"
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
