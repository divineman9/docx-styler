# DOCX Market Report Styler

A Python utility that transforms plain .docx market update reports into professionally styled documents with light-colored formatting.

## Features

- **Section Headings** - Light blue, bold, 13pt for major sections
- **Stock Ticker Highlighting** - 3-tier color system:
  - Strong/High Priority (light green): AAPL, AMD, NVDA, SMH, INTC, NXP, FCX, BHP, TECK
  - Watchlist/Developing (light yellow): AMZN, COST, ARM, IRDM, LUNR, APLD, IREN, SOXL, AMPX, XND, UCDS, NC
  - Caution/Weakness (light pink): XOM
- **Smart Detection** - Highlights only the ticker symbol, not the whole paragraph
- **Important Phrases** - Subtle bold+italic emphasis on keywords like target, breakout, momentum, support, entry
- **Professional Output** - Clean, light pastel colors

## Installation

```
pip install -r requirements.txt
```

## Usage

```
python market_report_styler.py
```

The script will prompt for your .docx file path and save a new _styled copy.

## Requirements

- Python 3.10+
- python-docx
