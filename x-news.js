window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T03:50:05.449Z",
  "items": [
    {
      "time": "12:11",
      "title": "米イラン レバノン停戦巡り合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585183?source=rss",
      "publishedAt": "2026-06-22T03:11:14.000Z",
      "xQuery": "米イラン レバノン停戦巡り合意"
    },
    {
      "time": "11:44",
      "title": "台風7号 27日に九州に接近の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585172?source=rss",
      "publishedAt": "2026-06-22T02:44:30.000Z",
      "xQuery": "台風7号 27日に九州に接近の恐れ"
    },
    {
      "time": "12:00",
      "title": "首相 動画巡り秘書の陳述書提出へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585182?source=rss",
      "publishedAt": "2026-06-22T03:00:54.000Z",
      "xQuery": "首相 動画巡り秘書の陳述書提出へ"
    },
    {
      "time": "11:39",
      "title": "温泉5歳不明 浴室の窓開いた状態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585171?source=rss",
      "publishedAt": "2026-06-22T02:39:34.000Z",
      "xQuery": "温泉5歳不明 浴室の窓開いた状態"
    },
    {
      "time": "11:59",
      "title": "栃木強殺 犬殺した疑い6人追送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585180?source=rss",
      "publishedAt": "2026-06-22T02:59:44.000Z",
      "xQuery": "栃木強殺 犬殺した疑い6人追送検"
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
