window.LUS_X_NEWS = {
  "updatedAt": "2026-05-28T02:24:33.363Z",
  "items": [
    {
      "time": "09:41",
      "title": "台風6号北上 週明けに沖縄接近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581987?source=rss",
      "publishedAt": "2026-05-28T00:41:20.000Z",
      "xQuery": "台風6号北上 週明けに沖縄接近か"
    },
    {
      "time": "07:40",
      "title": "安倍氏銃撃 控訴審へ弁護団再編",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581971?source=rss",
      "publishedAt": "2026-05-27T22:40:38.000Z",
      "xQuery": "安倍氏銃撃 控訴審へ弁護団再編"
    },
    {
      "time": "10:52",
      "title": "米軍 イラン軍事施設などを攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581992?source=rss",
      "publishedAt": "2026-05-28T01:52:43.000Z",
      "xQuery": "米軍 イラン軍事施設などを攻撃"
    },
    {
      "time": "09:28",
      "title": "ロシア軍の戦死者 50万人近くに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581985?source=rss",
      "publishedAt": "2026-05-28T00:28:27.000Z",
      "xQuery": "ロシア軍の戦死者 50万人近くに"
    },
    {
      "time": "09:28",
      "title": "栃木強殺 出国の男がバール購入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581986?source=rss",
      "publishedAt": "2026-05-28T00:28:00.000Z",
      "xQuery": "栃木強殺 出国の男がバール購入"
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
