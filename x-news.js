window.LUS_X_NEWS = {
  "updatedAt": "2026-10-12T15:45:26.342Z",
  "items": [
    {
      "time": "23:27",
      "title": "財務相 世銀IMF合同開発委議長に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598563?source=rss",
      "publishedAt": "2026-10-12T14:27:58.000Z",
      "xQuery": "財務相 世銀IMF合同開発委議長に"
    },
    {
      "time": "20:25",
      "title": "ICC制裁 赤根智子所長がコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598542?source=rss",
      "publishedAt": "2026-10-12T11:25:28.000Z",
      "xQuery": "ICC制裁 赤根智子所長がコメント"
    },
    {
      "time": "23:56",
      "title": "台所に女性遺体 傷害疑い長男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598564?source=rss",
      "publishedAt": "2026-10-12T14:56:10.000Z",
      "xQuery": "台所に女性遺体 傷害疑い長男逮捕"
    },
    {
      "time": "23:00",
      "title": "マンション高騰 売れ残り値下げも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598560?source=rss",
      "publishedAt": "2026-10-12T14:00:00.000Z",
      "xQuery": "マンション高騰 売れ残り値下げも"
    },
    {
      "time": "23:08",
      "title": "マイクロソフト 新型AI半導体発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598562?source=rss",
      "publishedAt": "2026-10-12T14:08:55.000Z",
      "xQuery": "マイクロソフト 新型AI半導体発表"
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
