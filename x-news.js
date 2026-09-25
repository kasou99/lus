window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T09:20:25.557Z",
  "items": [
    {
      "time": "16:31",
      "title": "18歳未満選挙運動 一律禁止は違憲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596498?source=rss",
      "publishedAt": "2026-09-25T07:31:05.000Z",
      "xQuery": "18歳未満選挙運動 一律禁止は違憲"
    },
    {
      "time": "16:40",
      "title": "JR九州27年度にも新金融サービス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596500?source=rss",
      "publishedAt": "2026-09-25T07:40:48.000Z",
      "xQuery": "JR九州27年度にも新金融サービス"
    },
    {
      "time": "17:05",
      "title": "姫路独協大 徳洲会に経営権譲渡へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596507?source=rss",
      "publishedAt": "2026-09-25T08:05:35.000Z",
      "xQuery": "姫路独協大 徳洲会に経営権譲渡へ"
    },
    {
      "time": "17:05",
      "title": "ahamo「大盛りオプション」終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596506?source=rss",
      "publishedAt": "2026-09-25T08:05:50.000Z",
      "xQuery": "ahamo「大盛りオプション」終了へ"
    },
    {
      "time": "17:40",
      "title": "市販ナビ ストラーダ生産終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596512?source=rss",
      "publishedAt": "2026-09-25T08:40:26.000Z",
      "xQuery": "市販ナビ ストラーダ生産終了へ"
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
