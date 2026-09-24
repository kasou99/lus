window.LUS_X_NEWS = {
  "updatedAt": "2026-09-24T07:22:16.833Z",
  "items": [
    {
      "time": "14:14",
      "title": "トランプ氏が習氏を出迎え 思惑は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596362?source=rss",
      "publishedAt": "2026-09-24T05:14:19.000Z",
      "xQuery": "トランプ氏が習氏を出迎え 思惑は"
    },
    {
      "time": "16:01",
      "title": "太陽光発電施設で発火 印旛沼付近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596372?source=rss",
      "publishedAt": "2026-09-24T07:01:20.000Z",
      "xQuery": "太陽光発電施設で発火 印旛沼付近"
    },
    {
      "time": "14:50",
      "title": "鉄塔転落死 遺族が会社に要望書",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596366?source=rss",
      "publishedAt": "2026-09-24T05:50:06.000Z",
      "xQuery": "鉄塔転落死 遺族が会社に要望書"
    },
    {
      "time": "14:16",
      "title": "中学生10人に追われ観念 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596363?source=rss",
      "publishedAt": "2026-09-24T05:16:59.000Z",
      "xQuery": "中学生10人に追われ観念 男を逮捕"
    },
    {
      "time": "14:49",
      "title": "ジャングリア親会社 173億円赤字",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596367?source=rss",
      "publishedAt": "2026-09-24T05:49:43.000Z",
      "xQuery": "ジャングリア親会社 173億円赤字"
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
