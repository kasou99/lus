window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T02:35:35.227Z",
  "items": [
    {
      "time": "11:27",
      "title": "台風 スピードアップし日本の東へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601396?source=rss",
      "publishedAt": "2026-11-05T02:27:04.000Z",
      "xQuery": "台風 スピードアップし日本の東へ"
    },
    {
      "time": "10:14",
      "title": "仏銀行サイバー攻撃 177億円流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601387?source=rss",
      "publishedAt": "2026-11-05T01:14:21.000Z",
      "xQuery": "仏銀行サイバー攻撃 177億円流出"
    },
    {
      "time": "10:22",
      "title": "新名神6人死亡 拘禁刑7年が確定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601390?source=rss",
      "publishedAt": "2026-11-05T01:22:25.000Z",
      "xQuery": "新名神6人死亡 拘禁刑7年が確定"
    },
    {
      "time": "10:49",
      "title": "イラン 大敗のトランプ氏を嘲笑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601392?source=rss",
      "publishedAt": "2026-11-05T01:49:37.000Z",
      "xQuery": "イラン 大敗のトランプ氏を嘲笑"
    },
    {
      "time": "10:50",
      "title": "料理の負担減「メンパ食材」注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601391?source=rss",
      "publishedAt": "2026-11-05T01:50:10.000Z",
      "xQuery": "料理の負担減「メンパ食材」注目"
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
