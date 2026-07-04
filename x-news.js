window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T07:28:14.508Z",
  "items": [
    {
      "time": "13:15",
      "title": "大雨もたらす「大気の川」流量増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586688?source=rss",
      "publishedAt": "2026-07-04T04:15:47.000Z",
      "xQuery": "大雨もたらす「大気の川」流量増"
    },
    {
      "time": "14:10",
      "title": "熱波のパリ周辺 1週間の死者6割増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586692?source=rss",
      "publishedAt": "2026-07-04T05:10:14.000Z",
      "xQuery": "熱波のパリ周辺 1週間の死者6割増"
    },
    {
      "time": "15:29",
      "title": "不明の10歳死亡 父が声震わせ訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586704?source=rss",
      "publishedAt": "2026-07-04T06:29:41.000Z",
      "xQuery": "不明の10歳死亡 父が声震わせ訴え"
    },
    {
      "time": "15:08",
      "title": "クマに発砲も 別メンバーに当たる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586701?source=rss",
      "publishedAt": "2026-07-04T06:08:37.000Z",
      "xQuery": "クマに発砲も 別メンバーに当たる"
    },
    {
      "time": "16:05",
      "title": "タイ女性看護師 戒律破り僧侶救う",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586705?source=rss",
      "publishedAt": "2026-07-04T07:05:53.000Z",
      "xQuery": "タイ女性看護師 戒律破り僧侶救う"
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
