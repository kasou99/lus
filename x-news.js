window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T05:18:37.813Z",
  "items": [
    {
      "time": "11:40",
      "title": "東京都心37日連続で雨 なぜ続いた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598350?source=rss",
      "publishedAt": "2026-10-11T02:40:44.000Z",
      "xQuery": "東京都心37日連続で雨 なぜ続いた"
    },
    {
      "time": "12:07",
      "title": "インド 抗議集会で6000人拘束か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598354?source=rss",
      "publishedAt": "2026-10-11T03:07:21.000Z",
      "xQuery": "インド 抗議集会で6000人拘束か"
    },
    {
      "time": "13:41",
      "title": "女性刺傷 知人男性発見し事情聴取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598366?source=rss",
      "publishedAt": "2026-10-11T04:41:42.000Z",
      "xQuery": "女性刺傷 知人男性発見し事情聴取"
    },
    {
      "time": "13:27",
      "title": "看護師が撮った動画がSNSに 解雇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598363?source=rss",
      "publishedAt": "2026-10-11T04:27:18.000Z",
      "xQuery": "看護師が撮った動画がSNSに 解雇"
    },
    {
      "time": "12:17",
      "title": "山梨学院大 試験替え玉を複数確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598356?source=rss",
      "publishedAt": "2026-10-11T03:17:00.000Z",
      "xQuery": "山梨学院大 試験替え玉を複数確認"
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
