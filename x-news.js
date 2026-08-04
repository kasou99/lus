window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T22:54:19.318Z",
  "items": [
    {
      "time": "23:12",
      "title": "熊本地震1週間 避難所に7500人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590548?source=rss",
      "publishedAt": "2026-08-04T14:12:21.000Z",
      "xQuery": "熊本地震1週間 避難所に7500人超"
    },
    {
      "time": "06:42",
      "title": "NYダウ900ドル超高 連日の最高値",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590554?source=rss",
      "publishedAt": "2026-08-04T21:42:27.000Z",
      "xQuery": "NYダウ900ドル超高 連日の最高値"
    },
    {
      "time": "06:26",
      "title": "福岡県議会 第三者委を設置へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590553?source=rss",
      "publishedAt": "2026-08-04T21:26:12.000Z",
      "xQuery": "福岡県議会 第三者委を設置へ"
    },
    {
      "time": "23:50",
      "title": "刃物持つ男に警官が発砲 男は死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590551?source=rss",
      "publishedAt": "2026-08-04T14:50:36.000Z",
      "xQuery": "刃物持つ男に警官が発砲 男は死亡"
    },
    {
      "time": "21:43",
      "title": "イオン爆発 告別式に飾ったドレス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590541?source=rss",
      "publishedAt": "2026-08-04T12:43:44.000Z",
      "xQuery": "イオン爆発 告別式に飾ったドレス"
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
