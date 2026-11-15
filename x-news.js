window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T11:35:08.139Z",
  "items": [
    {
      "time": "20:03",
      "title": "横田さん拉致49年 北側の真相不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602710?source=rss",
      "publishedAt": "2026-11-15T11:03:14.000Z",
      "xQuery": "横田さん拉致49年 北側の真相不明"
    },
    {
      "time": "19:00",
      "title": "防衛省AI活用の基本方針 見直しへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602704?source=rss",
      "publishedAt": "2026-11-15T10:00:56.000Z",
      "xQuery": "防衛省AI活用の基本方針 見直しへ"
    },
    {
      "time": "19:21",
      "title": "愛知の住宅強盗事件 トクリュウか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602706?source=rss",
      "publishedAt": "2026-11-15T10:21:39.000Z",
      "xQuery": "愛知の住宅強盗事件 トクリュウか"
    },
    {
      "time": "16:07",
      "title": "死んだンゴ 投稿者命日に寄付急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602677?source=rss",
      "publishedAt": "2026-11-15T07:07:47.000Z",
      "xQuery": "死んだンゴ 投稿者命日に寄付急増"
    },
    {
      "time": "20:08",
      "title": "スピッツ﨑山さん重傷 治療に専念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602711?source=rss",
      "publishedAt": "2026-11-15T11:08:59.000Z",
      "xQuery": "スピッツ﨑山さん重傷 治療に専念"
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
