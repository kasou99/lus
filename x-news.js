window.LUS_X_NEWS = {
  "updatedAt": "2026-11-17T13:36:11.661Z",
  "items": [
    {
      "time": "20:50",
      "title": "中国首相 高市氏との接触避けたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602947?source=rss",
      "publishedAt": "2026-11-17T11:50:49.000Z",
      "xQuery": "中国首相 高市氏との接触避けたか"
    },
    {
      "time": "22:02",
      "title": "ASEAN 米大統領へ「特別待遇」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602954?source=rss",
      "publishedAt": "2026-11-17T13:02:27.000Z",
      "xQuery": "ASEAN 米大統領へ「特別待遇」"
    },
    {
      "time": "21:30",
      "title": "「JINS」最大1829万件の情報流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602951?source=rss",
      "publishedAt": "2026-11-17T12:30:05.000Z",
      "xQuery": "「JINS」最大1829万件の情報流出"
    },
    {
      "time": "21:03",
      "title": "JT ロシア問題で巨額損失の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602948?source=rss",
      "publishedAt": "2026-11-17T12:03:11.000Z",
      "xQuery": "JT ロシア問題で巨額損失の恐れ"
    },
    {
      "time": "20:20",
      "title": "政府広報 陰謀論系YouTuber起用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602941?source=rss",
      "publishedAt": "2026-11-17T11:20:29.000Z",
      "xQuery": "政府広報 陰謀論系YouTuber起用"
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
