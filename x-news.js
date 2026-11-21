window.LUS_X_NEWS = {
  "updatedAt": "2026-11-21T00:29:42.837Z",
  "items": [
    {
      "time": "07:36",
      "title": "首相 APECで台湾代表と会談せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603354?source=rss",
      "publishedAt": "2026-11-20T22:36:38.000Z",
      "xQuery": "首相 APECで台湾代表と会談せず"
    },
    {
      "time": "08:10",
      "title": "外国代理人 届け出義務3要件整理",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603362?source=rss",
      "publishedAt": "2026-11-20T23:10:14.000Z",
      "xQuery": "外国代理人 届け出義務3要件整理"
    },
    {
      "time": "08:46",
      "title": "首相中国到着時の段差 木原氏説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603366?source=rss",
      "publishedAt": "2026-11-20T23:46:23.000Z",
      "xQuery": "首相中国到着時の段差 木原氏説明"
    },
    {
      "time": "07:51",
      "title": "「リーマン予想」生成AIが証明か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603360?source=rss",
      "publishedAt": "2026-11-20T22:51:15.000Z",
      "xQuery": "「リーマン予想」生成AIが証明か"
    },
    {
      "time": "09:16",
      "title": "「精子力」チェック 受ける意義",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603371?source=rss",
      "publishedAt": "2026-11-21T00:16:42.000Z",
      "xQuery": "「精子力」チェック 受ける意義"
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
