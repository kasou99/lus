window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T05:59:04.001Z",
  "items": [
    {
      "time": "12:41",
      "title": "G7開幕へ 米と欧の溝は埋まるか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584313?source=rss",
      "publishedAt": "2026-06-15T03:41:21.000Z",
      "xQuery": "G7開幕へ 米と欧の溝は埋まるか"
    },
    {
      "time": "13:38",
      "title": "東北は大気不安定 関東はヒンヤリ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584318?source=rss",
      "publishedAt": "2026-06-15T04:38:26.000Z",
      "xQuery": "東北は大気不安定 関東はヒンヤリ"
    },
    {
      "time": "12:04",
      "title": "韓国スタバ 社員に「歴史教育」へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584305?source=rss",
      "publishedAt": "2026-06-15T03:04:56.000Z",
      "xQuery": "韓国スタバ 社員に「歴史教育」へ"
    },
    {
      "time": "12:34",
      "title": "ジャガイモ余りが深刻化 ベルギー",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584312?source=rss",
      "publishedAt": "2026-06-15T03:34:51.000Z",
      "xQuery": "ジャガイモ余りが深刻化 ベルギー"
    },
    {
      "time": "13:45",
      "title": "スガキヤ 20年ぶり関東出店を発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584319?source=rss",
      "publishedAt": "2026-06-15T04:45:03.000Z",
      "xQuery": "スガキヤ 20年ぶり関東出店を発表"
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
