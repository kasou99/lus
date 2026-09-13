window.LUS_X_NEWS = {
  "updatedAt": "2026-09-13T08:41:15.810Z",
  "items": [
    {
      "time": "16:39",
      "title": "14-15日 北陸と東北は大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595161?source=rss",
      "publishedAt": "2026-09-13T07:39:08.000Z",
      "xQuery": "14-15日 北陸と東北は大雨の恐れ"
    },
    {
      "time": "15:24",
      "title": "フーシ派 紅海入口要衝を「支配」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595152?source=rss",
      "publishedAt": "2026-09-13T06:24:48.000Z",
      "xQuery": "フーシ派 紅海入口要衝を「支配」"
    },
    {
      "time": "16:43",
      "title": "ネパール災害 救助まで換気口で息",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595163?source=rss",
      "publishedAt": "2026-09-13T07:43:01.000Z",
      "xQuery": "ネパール災害 救助まで換気口で息"
    },
    {
      "time": "17:27",
      "title": "車ドア開き衝突 転倒後ひかれ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595167?source=rss",
      "publishedAt": "2026-09-13T08:27:24.000Z",
      "xQuery": "車ドア開き衝突 転倒後ひかれ死亡"
    },
    {
      "time": "15:38",
      "title": "作業中に配送品の下敷き 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595154?source=rss",
      "publishedAt": "2026-09-13T06:38:52.000Z",
      "xQuery": "作業中に配送品の下敷き 男性死亡"
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
