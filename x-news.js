window.LUS_X_NEWS = {
  "updatedAt": "2026-11-28T06:17:45.187Z",
  "items": [
    {
      "time": "14:48",
      "title": "米議会 フアンCEOの追及本格化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604299?source=rss",
      "publishedAt": "2026-11-28T05:48:58.000Z",
      "xQuery": "米議会 フアンCEOの追及本格化へ"
    },
    {
      "time": "14:47",
      "title": "台湾の統一地方選 与党が伸長か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604298?source=rss",
      "publishedAt": "2026-11-28T05:47:48.000Z",
      "xQuery": "台湾の統一地方選 与党が伸長か"
    },
    {
      "time": "12:53",
      "title": "生徒誘拐疑いの男 ネットで接点か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604287?source=rss",
      "publishedAt": "2026-11-28T03:53:24.000Z",
      "xQuery": "生徒誘拐疑いの男 ネットで接点か"
    },
    {
      "time": "14:10",
      "title": "L.L.Bean 日本支社を閉鎖へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604295?source=rss",
      "publishedAt": "2026-11-28T05:10:18.000Z",
      "xQuery": "L.L.Bean 日本支社を閉鎖へ"
    },
    {
      "time": "12:52",
      "title": "転落しそうな4歳保護 小学生手柄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604288?source=rss",
      "publishedAt": "2026-11-28T03:52:22.000Z",
      "xQuery": "転落しそうな4歳保護 小学生手柄"
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
