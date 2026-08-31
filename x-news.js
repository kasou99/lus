window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T05:18:43.604Z",
  "items": [
    {
      "time": "12:36",
      "title": "中立公の3党 合流断念を確認へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593733?source=rss",
      "publishedAt": "2026-08-31T03:36:40.000Z",
      "xQuery": "中立公の3党 合流断念を確認へ"
    },
    {
      "time": "13:36",
      "title": "北海道・大阪府 副首都で協定締結",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593737?source=rss",
      "publishedAt": "2026-08-31T04:36:41.000Z",
      "xQuery": "北海道・大阪府 副首都で協定締結"
    },
    {
      "time": "14:01",
      "title": "イラン 米軍基地への発射映像公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593738?source=rss",
      "publishedAt": "2026-08-31T05:01:36.000Z",
      "xQuery": "イラン 米軍基地への発射映像公開"
    },
    {
      "time": "11:50",
      "title": "ハウス食品G 壱番屋の売却検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593727?source=rss",
      "publishedAt": "2026-08-31T02:50:30.000Z",
      "xQuery": "ハウス食品G 壱番屋の売却検討"
    },
    {
      "time": "13:25",
      "title": "若者の35%「結婚するつもりない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593735?source=rss",
      "publishedAt": "2026-08-31T04:25:17.000Z",
      "xQuery": "若者の35%「結婚するつもりない」"
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
