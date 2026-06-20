window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T07:32:42.338Z",
  "items": [
    {
      "time": "14:41",
      "title": "台風 来週本州付近も警報級大雨か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584950?source=rss",
      "publishedAt": "2026-06-20T05:41:00.000Z",
      "xQuery": "台風 来週本州付近も警報級大雨か"
    },
    {
      "time": "15:13",
      "title": "頭に10cm痕 81年前の沖縄戦語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584952?source=rss",
      "publishedAt": "2026-06-20T06:13:44.000Z",
      "xQuery": "頭に10cm痕 81年前の沖縄戦語る"
    },
    {
      "time": "16:13",
      "title": "東海大仰星ラグビー部 いじめ認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584963?source=rss",
      "publishedAt": "2026-06-20T07:13:52.000Z",
      "xQuery": "東海大仰星ラグビー部 いじめ認定"
    },
    {
      "time": "15:46",
      "title": "AM3時行列 立ち食いそば店の執念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584959?source=rss",
      "publishedAt": "2026-06-20T06:46:13.000Z",
      "xQuery": "AM3時行列 立ち食いそば店の執念"
    },
    {
      "time": "12:52",
      "title": "夫に精子提供頼みシンママに 葛藤",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584940?source=rss",
      "publishedAt": "2026-06-20T03:52:34.000Z",
      "xQuery": "夫に精子提供頼みシンママに 葛藤"
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
