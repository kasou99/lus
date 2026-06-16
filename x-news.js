window.LUS_X_NEWS = {
  "updatedAt": "2026-06-16T23:37:29.953Z",
  "items": [
    {
      "time": "07:24",
      "title": "原油先物が5%急落 3カ月ぶり安値",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584533?source=rss",
      "publishedAt": "2026-06-16T22:24:24.000Z",
      "xQuery": "原油先物が5%急落 3カ月ぶり安値"
    },
    {
      "time": "22:46",
      "title": "利上げ 若年層の住宅ローン負担増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584519?source=rss",
      "publishedAt": "2026-06-16T13:46:19.000Z",
      "xQuery": "利上げ 若年層の住宅ローン負担増"
    },
    {
      "time": "22:58",
      "title": "米イラン合意 ネタニヤフ氏悪夢に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584521?source=rss",
      "publishedAt": "2026-06-16T13:58:32.000Z",
      "xQuery": "米イラン合意 ネタニヤフ氏悪夢に"
    },
    {
      "time": "06:39",
      "title": "高市陣営巡る動画報道 訂正相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584531?source=rss",
      "publishedAt": "2026-06-16T21:39:56.000Z",
      "xQuery": "高市陣営巡る動画報道 訂正相次ぐ"
    },
    {
      "time": "07:50",
      "title": "自宅敷地内に突然クマ 男性けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584537?source=rss",
      "publishedAt": "2026-06-16T22:50:21.000Z",
      "xQuery": "自宅敷地内に突然クマ 男性けが"
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
