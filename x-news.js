window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T18:46:18.062Z",
  "items": [
    {
      "time": "23:27",
      "title": "うるう秒廃止 うるう時の導入決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598933?source=rss",
      "publishedAt": "2026-10-15T14:27:01.000Z",
      "xQuery": "うるう秒廃止 うるう時の導入決定"
    },
    {
      "time": "22:12",
      "title": "タクシーやバス カスハラ客拒否へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598926?source=rss",
      "publishedAt": "2026-10-15T13:12:11.000Z",
      "xQuery": "タクシーやバス カスハラ客拒否へ"
    },
    {
      "time": "22:37",
      "title": "洗濯機が発火恐れ パナがリコール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598928?source=rss",
      "publishedAt": "2026-10-15T13:37:32.000Z",
      "xQuery": "洗濯機が発火恐れ パナがリコール"
    },
    {
      "time": "22:50",
      "title": "動画を苦に自殺 YouTuberを提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598927?source=rss",
      "publishedAt": "2026-10-15T13:50:30.000Z",
      "xQuery": "動画を苦に自殺 YouTuberを提訴"
    },
    {
      "time": "21:02",
      "title": "ヤンバルクイナの人工授精 初成功",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598918?source=rss",
      "publishedAt": "2026-10-15T12:02:28.000Z",
      "xQuery": "ヤンバルクイナの人工授精 初成功"
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
