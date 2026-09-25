window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T02:44:07.153Z",
  "items": [
    {
      "time": "11:13",
      "title": "長期金利一時3.115% 30年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596462?source=rss",
      "publishedAt": "2026-09-25T02:13:35.000Z",
      "xQuery": "長期金利一時3.115% 30年ぶり水準"
    },
    {
      "time": "11:01",
      "title": "両陛下 29日に熊本地震被災地訪問",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596459?source=rss",
      "publishedAt": "2026-09-25T02:01:10.000Z",
      "xQuery": "両陛下 29日に熊本地震被災地訪問"
    },
    {
      "time": "11:20",
      "title": "ネタニヤフ氏が国連演説 各国退席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596464?source=rss",
      "publishedAt": "2026-09-25T02:20:38.000Z",
      "xQuery": "ネタニヤフ氏が国連演説 各国退席"
    },
    {
      "time": "10:04",
      "title": "全東信破産 カード会社が支払いへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596454?source=rss",
      "publishedAt": "2026-09-25T01:04:50.000Z",
      "xQuery": "全東信破産 カード会社が支払いへ"
    },
    {
      "time": "09:33",
      "title": "ストーカー 紛失防止タグ悪用急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596450?source=rss",
      "publishedAt": "2026-09-25T00:33:39.000Z",
      "xQuery": "ストーカー 紛失防止タグ悪用急増"
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
