window.LUS_X_NEWS = {
  "updatedAt": "2026-11-25T05:36:12.052Z",
  "items": [
    {
      "time": "11:15",
      "title": "米比首脳会談の合意巡り食い違い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603894?source=rss",
      "publishedAt": "2026-11-25T02:15:52.000Z",
      "xQuery": "米比首脳会談の合意巡り食い違い"
    },
    {
      "time": "09:55",
      "title": "AI登場「創造性」問い直す機会に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603882?source=rss",
      "publishedAt": "2026-11-25T00:55:13.000Z",
      "xQuery": "AI登場「創造性」問い直す機会に"
    },
    {
      "time": "13:49",
      "title": "福岡市で人刺されたと通報 男逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603917?source=rss",
      "publishedAt": "2026-11-25T04:49:55.000Z",
      "xQuery": "福岡市で人刺されたと通報 男逃走"
    },
    {
      "time": "11:47",
      "title": "消えた技能実習生 今も6600人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603898?source=rss",
      "publishedAt": "2026-11-25T02:47:00.000Z",
      "xQuery": "消えた技能実習生 今も6600人不明"
    },
    {
      "time": "12:02",
      "title": "Microsoft 障害受けコードレッド",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603903?source=rss",
      "publishedAt": "2026-11-25T03:02:26.000Z",
      "xQuery": "Microsoft 障害受けコードレッド"
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
