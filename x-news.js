window.LUS_X_NEWS = {
  "updatedAt": "2026-06-03T09:50:42.537Z",
  "items": [
    {
      "time": "17:21",
      "title": "強硬姿勢崩さぬネタニヤフ氏 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582774?source=rss",
      "publishedAt": "2026-06-03T08:21:38.000Z",
      "xQuery": "強硬姿勢崩さぬネタニヤフ氏 背景"
    },
    {
      "time": "16:56",
      "title": "ポンプ設備が水没 青梅市で断水も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582800?source=rss",
      "publishedAt": "2026-06-03T07:56:14.000Z",
      "xQuery": "ポンプ設備が水没 青梅市で断水も"
    },
    {
      "time": "17:21",
      "title": "米 日本に12.5%の追加関税を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582802?source=rss",
      "publishedAt": "2026-06-03T08:21:38.000Z",
      "xQuery": "米 日本に12.5%の追加関税を検討"
    },
    {
      "time": "18:02",
      "title": "内田梨瑚被告 母の証言に涙ぬぐう",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582811?source=rss",
      "publishedAt": "2026-06-03T09:02:30.000Z",
      "xQuery": "内田梨瑚被告 母の証言に涙ぬぐう"
    },
    {
      "time": "11:59",
      "title": "はま寿司で迷惑行為撮影疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582766?source=rss",
      "publishedAt": "2026-06-03T02:59:07.000Z",
      "xQuery": "はま寿司で迷惑行為撮影疑い 逮捕"
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
