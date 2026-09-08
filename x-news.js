window.LUS_X_NEWS = {
  "updatedAt": "2026-09-08T04:20:49.618Z",
  "items": [
    {
      "time": "10:36",
      "title": "10日まで大雨恐れ 道路への影響大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594620?source=rss",
      "publishedAt": "2026-09-08T01:36:39.000Z",
      "xQuery": "10日まで大雨恐れ 道路への影響大"
    },
    {
      "time": "12:30",
      "title": "車水没 市は通報3分前に水位把握",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594631?source=rss",
      "publishedAt": "2026-09-08T03:30:44.000Z",
      "xQuery": "車水没 市は通報3分前に水位把握"
    },
    {
      "time": "12:08",
      "title": "一時1ドル152円台 約半年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594633?source=rss",
      "publishedAt": "2026-09-08T03:08:53.000Z",
      "xQuery": "一時1ドル152円台 約半年ぶり水準"
    },
    {
      "time": "11:26",
      "title": "福岡の海岸に遺体 不明19歳と確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594627?source=rss",
      "publishedAt": "2026-09-08T02:26:22.000Z",
      "xQuery": "福岡の海岸に遺体 不明19歳と確認"
    },
    {
      "time": "11:24",
      "title": "リユース市場拡大 悪質業者に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594626?source=rss",
      "publishedAt": "2026-09-08T02:24:19.000Z",
      "xQuery": "リユース市場拡大 悪質業者に注意"
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
