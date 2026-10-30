window.LUS_X_NEWS = {
  "updatedAt": "2026-10-30T10:13:22.603Z",
  "items": [
    {
      "time": "17:05",
      "title": "ウが日本に迎撃弾の供与を要望",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600698?source=rss",
      "publishedAt": "2026-10-30T08:05:41.000Z",
      "xQuery": "ウが日本に迎撃弾の供与を要望"
    },
    {
      "time": "17:38",
      "title": "宮古島沖で船火災 船内で1人発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600700?source=rss",
      "publishedAt": "2026-10-30T08:38:51.000Z",
      "xQuery": "宮古島沖で船火災 船内で1人発見"
    },
    {
      "time": "17:23",
      "title": "トヨタ 無人タクシー来年運行開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600696?source=rss",
      "publishedAt": "2026-10-30T08:23:11.000Z",
      "xQuery": "トヨタ 無人タクシー来年運行開始"
    },
    {
      "time": "18:26",
      "title": "東京メトロ「QR乗車券」導入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600705?source=rss",
      "publishedAt": "2026-10-30T09:26:07.000Z",
      "xQuery": "東京メトロ「QR乗車券」導入へ"
    },
    {
      "time": "18:00",
      "title": "給食のハマチで中毒か 児童搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600702?source=rss",
      "publishedAt": "2026-10-30T09:00:02.000Z",
      "xQuery": "給食のハマチで中毒か 児童搬送"
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
