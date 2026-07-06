window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T06:38:45.952Z",
  "items": [
    {
      "time": "15:17",
      "title": "中国ミサイル発射実験 成功と発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586935?source=rss",
      "publishedAt": "2026-07-06T06:17:33.000Z",
      "xQuery": "中国ミサイル発射実験 成功と発表"
    },
    {
      "time": "13:53",
      "title": "自民と立憲 集中審議など実施合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586930?source=rss",
      "publishedAt": "2026-07-06T04:53:34.000Z",
      "xQuery": "自民と立憲 集中審議など実施合意"
    },
    {
      "time": "13:41",
      "title": "車で小6はねた疑いの男 無免許か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586926?source=rss",
      "publishedAt": "2026-07-06T04:41:15.000Z",
      "xQuery": "車で小6はねた疑いの男 無免許か"
    },
    {
      "time": "13:51",
      "title": "高校生が暴行受ける 男5人が逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586927?source=rss",
      "publishedAt": "2026-07-06T04:51:58.000Z",
      "xQuery": "高校生が暴行受ける 男5人が逃走"
    },
    {
      "time": "14:02",
      "title": "中古ゲーム市場 ネット接続で変化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586931?source=rss",
      "publishedAt": "2026-07-06T05:02:26.000Z",
      "xQuery": "中古ゲーム市場 ネット接続で変化"
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
