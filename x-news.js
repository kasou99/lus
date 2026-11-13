window.LUS_X_NEWS = {
  "updatedAt": "2026-11-13T05:36:08.226Z",
  "items": [
    {
      "time": "12:57",
      "title": "イラン側 バーレーンの米施設攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602406?source=rss",
      "publishedAt": "2026-11-13T03:57:37.000Z",
      "xQuery": "イラン側 バーレーンの米施設攻撃"
    },
    {
      "time": "11:50",
      "title": "冬の電気・ガスなど支援 6500億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602397?source=rss",
      "publishedAt": "2026-11-13T02:50:29.000Z",
      "xQuery": "冬の電気・ガスなど支援 6500億円"
    },
    {
      "time": "12:06",
      "title": "Microsoft365で障害 SNSの反応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602401?source=rss",
      "publishedAt": "2026-11-13T03:06:06.000Z",
      "xQuery": "Microsoft365で障害 SNSの反応"
    },
    {
      "time": "14:20",
      "title": "クレカのICチップすり替えに注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602398?source=rss",
      "publishedAt": "2026-11-13T05:20:34.000Z",
      "xQuery": "クレカのICチップすり替えに注意"
    },
    {
      "time": "14:19",
      "title": "ボビー被告 不同意性交を認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602416?source=rss",
      "publishedAt": "2026-11-13T05:19:30.000Z",
      "xQuery": "ボビー被告 不同意性交を認める"
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
