# 文章圖表產生器

`charts_specs.py` 定義每張圖要插在哪篇文章、哪段文字之後，以及資料內容；`charts_lib.py` 產生 HTML；樣式在 `css/style.css` 的「ARTICLE CHARTS」區段。

```
python3 tools/charts/insert_charts.py            # 試跑，檢查每個插入點
python3 tools/charts/insert_charts.py --apply    # 寫入文章
```

可重複執行：會先移除 `<!-- fb-chart:… -->` 標記內的舊圖再重新插入。圖表數字一律取自文章原文。
