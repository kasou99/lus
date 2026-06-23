window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T21:39:34.406Z",
  "items": [
    {
      "time": "23:59",
      "title": "ダブル台風 接近前から大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585424?source=rss",
      "publishedAt": "2026-06-23T14:59:57.000Z",
      "xQuery": "ダブル台風 接近前から大雨の恐れ"
    },
    {
      "time": "22:27",
      "title": "首相 追悼式で相次いだヤジに言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585417?source=rss",
      "publishedAt": "2026-06-23T13:27:24.000Z",
      "xQuery": "首相 追悼式で相次いだヤジに言及"
    },
    {
      "time": "06:36",
      "title": "日系電機大手の社員 中国で拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585427?source=rss",
      "publishedAt": "2026-06-23T21:36:12.000Z",
      "xQuery": "日系電機大手の社員 中国で拘束"
    },
    {
      "time": "22:00",
      "title": "冷凍庫に切断された遺体 元妻逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585411?source=rss",
      "publishedAt": "2026-06-23T13:00:24.000Z",
      "xQuery": "冷凍庫に切断された遺体 元妻逮捕"
    },
    {
      "time": "20:00",
      "title": "5歳不明 父親は当時川を泳ぎ探す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585393?source=rss",
      "publishedAt": "2026-06-23T11:00:16.000Z",
      "xQuery": "5歳不明 父親は当時川を泳ぎ探す"
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
