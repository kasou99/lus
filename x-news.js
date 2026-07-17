window.LUS_X_NEWS = {
  "updatedAt": "2026-07-17T23:49:34.963Z",
  "items": [
    {
      "time": "08:01",
      "title": "ベネズエラ地震 死者5000人超に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588355?source=rss",
      "publishedAt": "2026-07-17T23:01:09.000Z",
      "xQuery": "ベネズエラ地震 死者5000人超に"
    },
    {
      "time": "08:21",
      "title": "連休 関東～九州は雷雨と暑さ注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588356?source=rss",
      "publishedAt": "2026-07-17T23:21:48.000Z",
      "xQuery": "連休 関東～九州は雷雨と暑さ注意"
    },
    {
      "time": "07:22",
      "title": "土砂で住宅倒壊し安否不明 足利市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588349?source=rss",
      "publishedAt": "2026-07-17T22:22:28.000Z",
      "xQuery": "土砂で住宅倒壊し安否不明 足利市"
    },
    {
      "time": "22:40",
      "title": "絞殺後に橋から女性落とされたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588341?source=rss",
      "publishedAt": "2026-07-17T13:40:57.000Z",
      "xQuery": "絞殺後に橋から女性落とされたか"
    },
    {
      "time": "07:52",
      "title": "ホンダ社長 北米にもう一つ拠点を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588353?source=rss",
      "publishedAt": "2026-07-17T22:52:08.000Z",
      "xQuery": "ホンダ社長 北米にもう一つ拠点を"
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
