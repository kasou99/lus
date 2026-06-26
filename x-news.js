window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T03:49:14.930Z",
  "items": [
    {
      "time": "11:43",
      "title": "台風接近に警戒 西日本中心に大雨",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585728?source=rss",
      "publishedAt": "2026-06-26T02:43:54.000Z",
      "xQuery": "台風接近に警戒 西日本中心に大雨"
    },
    {
      "time": "11:53",
      "title": "官房長官秘書官を交代へ 更迭か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585727?source=rss",
      "publishedAt": "2026-06-26T02:53:10.000Z",
      "xQuery": "官房長官秘書官を交代へ 更迭か"
    },
    {
      "time": "10:55",
      "title": "空自「航空宇宙自衛隊」に改編へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585719?source=rss",
      "publishedAt": "2026-06-26T01:55:21.000Z",
      "xQuery": "空自「航空宇宙自衛隊」に改編へ"
    },
    {
      "time": "11:41",
      "title": "ホンダ社長謝罪 4千億円超の赤字",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585724?source=rss",
      "publishedAt": "2026-06-26T02:41:43.000Z",
      "xQuery": "ホンダ社長謝罪 4千億円超の赤字"
    },
    {
      "time": "10:26",
      "title": "父と兄の遺体か 遺棄疑いで男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585713?source=rss",
      "publishedAt": "2026-06-26T01:26:46.000Z",
      "xQuery": "父と兄の遺体か 遺棄疑いで男逮捕"
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
