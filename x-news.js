window.LUS_X_NEWS = {
  "updatedAt": "2026-09-08T17:16:54.441Z",
  "items": [
    {
      "time": "00:52",
      "title": "愛知・岐阜の庄内川 氾濫注意報に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594689?source=rss",
      "publishedAt": "2026-09-08T15:52:50.000Z",
      "xQuery": "愛知・岐阜の庄内川 氾濫注意報に"
    },
    {
      "time": "20:13",
      "title": "大雨で大きく波打つ川 名古屋市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594678?source=rss",
      "publishedAt": "2026-09-08T11:13:21.000Z",
      "xQuery": "大雨で大きく波打つ川 名古屋市"
    },
    {
      "time": "21:19",
      "title": "近畿9日昼前にかけ線状降水帯恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594684?source=rss",
      "publishedAt": "2026-09-08T12:19:31.000Z",
      "xQuery": "近畿9日昼前にかけ線状降水帯恐れ"
    },
    {
      "time": "01:08",
      "title": "アンダーパス規制 対象拡大を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594691?source=rss",
      "publishedAt": "2026-09-08T16:08:30.000Z",
      "xQuery": "アンダーパス規制 対象拡大を検討"
    },
    {
      "time": "16:55",
      "title": "園児から「しね」手紙 いじめ相当",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594659?source=rss",
      "publishedAt": "2026-09-08T07:55:40.000Z",
      "xQuery": "園児から「しね」手紙 いじめ相当"
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
