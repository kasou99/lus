window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T10:35:19.693Z",
  "items": [
    {
      "time": "17:51",
      "title": "消費減税「効果小さい」63% 共同",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602696?source=rss",
      "publishedAt": "2026-11-15T08:51:34.000Z",
      "xQuery": "消費減税「効果小さい」63% 共同"
    },
    {
      "time": "17:56",
      "title": "「中国の元スパイ」語る 接近手口",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602697?source=rss",
      "publishedAt": "2026-11-15T08:56:52.000Z",
      "xQuery": "「中国の元スパイ」語る 接近手口"
    },
    {
      "time": "19:21",
      "title": "愛知の住宅強盗事件 トクリュウか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602706?source=rss",
      "publishedAt": "2026-11-15T10:21:39.000Z",
      "xQuery": "愛知の住宅強盗事件 トクリュウか"
    },
    {
      "time": "16:07",
      "title": "死んだンゴ 投稿者命日に寄付急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602677?source=rss",
      "publishedAt": "2026-11-15T07:07:47.000Z",
      "xQuery": "死んだンゴ 投稿者命日に寄付急増"
    },
    {
      "time": "18:40",
      "title": "スピッツ﨑山さん 交通事故で搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602703?source=rss",
      "publishedAt": "2026-11-15T09:40:26.000Z",
      "xQuery": "スピッツ﨑山さん 交通事故で搬送"
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
