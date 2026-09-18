window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T05:17:21.134Z",
  "items": [
    {
      "time": "14:08",
      "title": "首相 米大統領と来週会談で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595694?source=rss",
      "publishedAt": "2026-09-18T05:08:16.000Z",
      "xQuery": "首相 米大統領と来週会談で調整"
    },
    {
      "time": "12:21",
      "title": "台風が関東接近へ 道路冠水の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595683?source=rss",
      "publishedAt": "2026-09-18T03:21:39.000Z",
      "xQuery": "台風が関東接近へ 道路冠水の恐れ"
    },
    {
      "time": "12:37",
      "title": "転落死 会社の回答書に遺族落胆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595688?source=rss",
      "publishedAt": "2026-09-18T03:37:36.000Z",
      "xQuery": "転落死 会社の回答書に遺族落胆"
    },
    {
      "time": "11:42",
      "title": "大阪駅前の突起物 フェンス設置へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595676?source=rss",
      "publishedAt": "2026-09-18T02:42:49.000Z",
      "xQuery": "大阪駅前の突起物 フェンス設置へ"
    },
    {
      "time": "13:26",
      "title": "老舗菓子店にも倒産の波 背景は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595686?source=rss",
      "publishedAt": "2026-09-18T04:26:25.000Z",
      "xQuery": "老舗菓子店にも倒産の波 背景は"
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
