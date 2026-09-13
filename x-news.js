window.LUS_X_NEWS = {
  "updatedAt": "2026-09-13T02:25:09.496Z",
  "items": [
    {
      "time": "08:39",
      "title": "総務省 開示請求後に文書削除か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595115?source=rss",
      "publishedAt": "2026-09-12T23:39:52.000Z",
      "xQuery": "総務省 開示請求後に文書削除か"
    },
    {
      "time": "10:40",
      "title": "トランプ氏 フーシ派が不介入要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595131?source=rss",
      "publishedAt": "2026-09-13T01:40:51.000Z",
      "xQuery": "トランプ氏 フーシ派が不介入要請"
    },
    {
      "time": "09:09",
      "title": "13日 九州-北陸で急な強い雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595117?source=rss",
      "publishedAt": "2026-09-13T00:09:53.000Z",
      "xQuery": "13日 九州-北陸で急な強い雨恐れ"
    },
    {
      "time": "09:20",
      "title": "警察を振り切ったバイク転倒 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595121?source=rss",
      "publishedAt": "2026-09-13T00:20:04.000Z",
      "xQuery": "警察を振り切ったバイク転倒 死亡"
    },
    {
      "time": "09:52",
      "title": "支持広げる「横長バッグ」魅力は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595126?source=rss",
      "publishedAt": "2026-09-13T00:52:44.000Z",
      "xQuery": "支持広げる「横長バッグ」魅力は"
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
