window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T21:19:00.758Z",
  "items": [
    {
      "time": "00:10",
      "title": "台風 雨風による交通機関乱れ注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591269?source=rss",
      "publishedAt": "2026-08-10T15:10:06.000Z",
      "xQuery": "台風 雨風による交通機関乱れ注意"
    },
    {
      "time": "23:47",
      "title": "避難所に幼なじみ 70年ぶりの再会",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591263?source=rss",
      "publishedAt": "2026-08-10T14:47:09.000Z",
      "xQuery": "避難所に幼なじみ 70年ぶりの再会"
    },
    {
      "time": "22:58",
      "title": "八代地域 大潮での浸水や冠水注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591261?source=rss",
      "publishedAt": "2026-08-10T13:58:09.000Z",
      "xQuery": "八代地域 大潮での浸水や冠水注意"
    },
    {
      "time": "23:24",
      "title": "南米コロンビアでM7.4の地震",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591262?source=rss",
      "publishedAt": "2026-08-10T14:24:11.000Z",
      "xQuery": "南米コロンビアでM7.4の地震"
    },
    {
      "time": "20:44",
      "title": "中1と小3死亡 遊具があおられ落水",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591245?source=rss",
      "publishedAt": "2026-08-10T11:44:56.000Z",
      "xQuery": "中1と小3死亡 遊具があおられ落水"
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
