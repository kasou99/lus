window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T16:11:09.994Z",
  "items": [
    {
      "time": "18:15",
      "title": "被爆時は1歳 家族の証言継ぐ女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590635?source=rss",
      "publishedAt": "2026-08-05T09:15:08.000Z",
      "xQuery": "被爆時は1歳 家族の証言継ぐ女性"
    },
    {
      "time": "22:30",
      "title": "かき氷の名店 熊本地震で涙の解体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590665?source=rss",
      "publishedAt": "2026-08-05T13:30:54.000Z",
      "xQuery": "かき氷の名店 熊本地震で涙の解体"
    },
    {
      "time": "22:56",
      "title": "住宅全焼4人遺体 叫び声聞こえた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590669?source=rss",
      "publishedAt": "2026-08-05T13:56:04.000Z",
      "xQuery": "住宅全焼4人遺体 叫び声聞こえた"
    },
    {
      "time": "23:20",
      "title": "立体駐車場から車が転落 77歳重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590671?source=rss",
      "publishedAt": "2026-08-05T14:20:20.000Z",
      "xQuery": "立体駐車場から車が転落 77歳重体"
    },
    {
      "time": "23:16",
      "title": "スペースXロケット残骸 月衝突か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590670?source=rss",
      "publishedAt": "2026-08-05T14:16:27.000Z",
      "xQuery": "スペースXロケット残骸 月衝突か"
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
