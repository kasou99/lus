window.LUS_X_NEWS = {
  "updatedAt": "2026-10-06T02:28:46.281Z",
  "items": [
    {
      "time": "11:15",
      "title": "危険アンダーパスに遮断機 国交省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597720?source=rss",
      "publishedAt": "2026-10-06T02:15:40.000Z",
      "xQuery": "危険アンダーパスに遮断機 国交省"
    },
    {
      "time": "10:49",
      "title": "那覇強殺事件 短時間で犯行か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597717?source=rss",
      "publishedAt": "2026-10-06T01:49:01.000Z",
      "xQuery": "那覇強殺事件 短時間で犯行か"
    },
    {
      "time": "10:23",
      "title": "日本の制裁受け 露が対抗措置表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597713?source=rss",
      "publishedAt": "2026-10-06T01:23:30.000Z",
      "xQuery": "日本の制裁受け 露が対抗措置表明"
    },
    {
      "time": "11:17",
      "title": "3度浸水のラーメン店 再開に行列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597722?source=rss",
      "publishedAt": "2026-10-06T02:17:36.000Z",
      "xQuery": "3度浸水のラーメン店 再開に行列"
    },
    {
      "time": "10:00",
      "title": "米の公立学校で「禁書」が大幅増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597710?source=rss",
      "publishedAt": "2026-10-06T01:00:29.000Z",
      "xQuery": "米の公立学校で「禁書」が大幅増"
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
