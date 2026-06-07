window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T07:36:19.029Z",
  "items": [
    {
      "time": "15:51",
      "title": "政府 海峡への自衛隊派遣に3条件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583302?source=rss",
      "publishedAt": "2026-06-07T06:51:52.000Z",
      "xQuery": "政府 海峡への自衛隊派遣に3条件"
    },
    {
      "time": "15:05",
      "title": "栃木 強殺未遂疑いで夫婦を再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583296?source=rss",
      "publishedAt": "2026-06-07T06:05:58.000Z",
      "xQuery": "栃木 強殺未遂疑いで夫婦を再逮捕"
    },
    {
      "time": "15:23",
      "title": "非核化巡る米側見解 虚偽と与正氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583299?source=rss",
      "publishedAt": "2026-06-07T06:23:27.000Z",
      "xQuery": "非核化巡る米側見解 虚偽と与正氏"
    },
    {
      "time": "14:28",
      "title": "米で2人が銃撃ち合いか 12人負傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583293?source=rss",
      "publishedAt": "2026-06-07T05:28:34.000Z",
      "xQuery": "米で2人が銃撃ち合いか 12人負傷"
    },
    {
      "time": "15:44",
      "title": "「苦手でもひと口」は虐待なのか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583303?source=rss",
      "publishedAt": "2026-06-07T06:44:05.000Z",
      "xQuery": "「苦手でもひと口」は虐待なのか"
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
