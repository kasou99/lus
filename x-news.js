window.LUS_X_NEWS = {
  "updatedAt": "2026-10-25T09:16:40.186Z",
  "items": [
    {
      "time": "17:39",
      "title": "台風30号 弱まりながら九州接近へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600076?source=rss",
      "publishedAt": "2026-10-25T08:39:11.000Z",
      "xQuery": "台風30号 弱まりながら九州接近へ"
    },
    {
      "time": "16:44",
      "title": "断水で透析危機 被災病院の現実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600072?source=rss",
      "publishedAt": "2026-10-25T07:44:16.000Z",
      "xQuery": "断水で透析危機 被災病院の現実"
    },
    {
      "time": "15:30",
      "title": "和菓子店主殺害 強殺疑い2人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600058?source=rss",
      "publishedAt": "2026-10-25T06:30:23.000Z",
      "xQuery": "和菓子店主殺害 強殺疑い2人逮捕"
    },
    {
      "time": "15:06",
      "title": "有毒植物誤食 AI判定も過信は禁物",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600056?source=rss",
      "publishedAt": "2026-10-25T06:06:37.000Z",
      "xQuery": "有毒植物誤食 AI判定も過信は禁物"
    },
    {
      "time": "16:17",
      "title": "Suicaペンギンなぜ「卒業」解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600063?source=rss",
      "publishedAt": "2026-10-25T07:17:05.000Z",
      "xQuery": "Suicaペンギンなぜ「卒業」解説"
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
