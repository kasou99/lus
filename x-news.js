window.LUS_X_NEWS = {
  "updatedAt": "2026-06-18T23:10:33.608Z",
  "items": [
    {
      "time": "07:58",
      "title": "最新AIの対策 外国政府と連携強化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584781?source=rss",
      "publishedAt": "2026-06-18T22:58:17.000Z",
      "xQuery": "最新AIの対策 外国政府と連携強化"
    },
    {
      "time": "06:49",
      "title": "米 イラン港湾への海上封鎖を解除",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584773?source=rss",
      "publishedAt": "2026-06-18T21:49:33.000Z",
      "xQuery": "米 イラン港湾への海上封鎖を解除"
    },
    {
      "time": "06:26",
      "title": "一時1ドル161円台 約2年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584771?source=rss",
      "publishedAt": "2026-06-18T21:26:30.000Z",
      "xQuery": "一時1ドル161円台 約2年ぶり水準"
    },
    {
      "time": "07:24",
      "title": "女児にぶつかり傷害疑い 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584776?source=rss",
      "publishedAt": "2026-06-18T22:24:03.000Z",
      "xQuery": "女児にぶつかり傷害疑い 男を逮捕"
    },
    {
      "time": "06:35",
      "title": "オデッセイ国内販売終了へ ホンダ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584772?source=rss",
      "publishedAt": "2026-06-18T21:35:28.000Z",
      "xQuery": "オデッセイ国内販売終了へ ホンダ"
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
