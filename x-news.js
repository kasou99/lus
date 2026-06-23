window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T10:20:28.757Z",
  "items": [
    {
      "time": "17:34",
      "title": "ブレグジット10年 英とEU溝深く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585371?source=rss",
      "publishedAt": "2026-06-23T08:34:52.000Z",
      "xQuery": "ブレグジット10年 英とEU溝深く"
    },
    {
      "time": "17:56",
      "title": "ダブル台風 7号は関東接近の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585375?source=rss",
      "publishedAt": "2026-06-23T08:56:13.000Z",
      "xQuery": "ダブル台風 7号は関東接近の恐れ"
    },
    {
      "time": "18:31",
      "title": "ラオスで日本人男女9人を拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585384?source=rss",
      "publishedAt": "2026-06-23T09:31:38.000Z",
      "xQuery": "ラオスで日本人男女9人を拘束"
    },
    {
      "time": "17:32",
      "title": "小学校火災 焼き切れたコード発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585364?source=rss",
      "publishedAt": "2026-06-23T08:32:22.000Z",
      "xQuery": "小学校火災 焼き切れたコード発見"
    },
    {
      "time": "17:56",
      "title": "給食の緑茶は大量廃棄 驚いた市長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585377?source=rss",
      "publishedAt": "2026-06-23T08:56:36.000Z",
      "xQuery": "給食の緑茶は大量廃棄 驚いた市長"
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
