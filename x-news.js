window.LUS_X_NEWS = {
  "updatedAt": "2026-10-09T09:23:13.583Z",
  "items": [
    {
      "time": "17:38",
      "title": "チューハイも価格調整 複数社説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598149?source=rss",
      "publishedAt": "2026-10-09T08:38:00.000Z",
      "xQuery": "チューハイも価格調整 複数社説明"
    },
    {
      "time": "14:03",
      "title": "警視庁「自動運転企画室」設置へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598119?source=rss",
      "publishedAt": "2026-10-09T05:03:19.000Z",
      "xQuery": "警視庁「自動運転企画室」設置へ"
    },
    {
      "time": "16:13",
      "title": "参院野党 農相の問責決議案検討へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598132?source=rss",
      "publishedAt": "2026-10-09T07:13:40.000Z",
      "xQuery": "参院野党 農相の問責決議案検討へ"
    },
    {
      "time": "17:58",
      "title": "岩屋前外相 中国の対日批判に苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598153?source=rss",
      "publishedAt": "2026-10-09T08:58:22.000Z",
      "xQuery": "岩屋前外相 中国の対日批判に苦言"
    },
    {
      "time": "16:19",
      "title": "JR東 個人情報のべ206万件漏洩か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598137?source=rss",
      "publishedAt": "2026-10-09T07:19:11.000Z",
      "xQuery": "JR東 個人情報のべ206万件漏洩か"
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
