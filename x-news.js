window.LUS_X_NEWS = {
  "updatedAt": "2026-10-28T13:36:52.548Z",
  "items": [
    {
      "time": "20:01",
      "title": "武部農相 衆院選の人件費巡り疑惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600466?source=rss",
      "publishedAt": "2026-10-28T11:01:51.000Z",
      "xQuery": "武部農相 衆院選の人件費巡り疑惑"
    },
    {
      "time": "19:52",
      "title": "衆院比例31削減案 識者の見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600453?source=rss",
      "publishedAt": "2026-10-28T10:52:36.000Z",
      "xQuery": "衆院比例31削減案 識者の見解"
    },
    {
      "time": "21:38",
      "title": "茨城・古河市で火災 2人心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600476?source=rss",
      "publishedAt": "2026-10-28T12:38:31.000Z",
      "xQuery": "茨城・古河市で火災 2人心肺停止"
    },
    {
      "time": "21:24",
      "title": "「千鳥饅頭」千鳥屋本家が破産へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600474?source=rss",
      "publishedAt": "2026-10-28T12:24:14.000Z",
      "xQuery": "「千鳥饅頭」千鳥屋本家が破産へ"
    },
    {
      "time": "18:15",
      "title": "小型恐竜の骨格標本 75億円で落札",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600458?source=rss",
      "publishedAt": "2026-10-28T09:15:30.000Z",
      "xQuery": "小型恐竜の骨格標本 75億円で落札"
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
