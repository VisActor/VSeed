# @visactor/vseed

## 0.1.27

### Patch Changes

- be843e0: feat: add default dimension encoding for label
- a41f30b: feat: add showDimension in label
- 1d77977: feat: optimize the group paralell only has one measure name
- 2ddda7f: feat: add string equal for =, accurate equak for == in selector
- 40971c8: fix: dim label display error
- 2e01a77: feat: hide scatter measure value label in default

## 0.1.26

### Patch Changes

- a05daa3: break change: getColorItems return object array, each has id and alias.

## 0.1.25

### Patch Changes

- ac2b2e7: fix: line style error in pivot line

## 0.1.24

### Patch Changes

- 56cab1e: fix: heatmap render error
- e683f39: fix: percent auto formatter error

## 0.1.23

### Patch Changes

- c07eea4: fix: linear color encoding should not fold measures
- c9da8cf: fix: percent linear axis label format not working with autoFormat

## 0.1.22

### Patch Changes

- fc513d1: feat: remove pivot indicator name in pie\donut\rose\roseParallel\funnel\radar
- 23b9d1c: fix: lineSmooth error in radar chart
- 23b9d1c: feat: add default sizeRange for scatter
- ff4b333: fix: bottom line missing in combination pie
- 23b9d1c: fix: remove useless color type in heatmap and funnel

## 0.1.21

### Patch Changes

- fix: band error in dualAxis
- fix: annotation text missing in bottom

## 0.1.20

### Patch Changes

- feat: test publish

## 0.1.19

### Patch Changes

- feat: optimize pivot table style
- fix: color linear style
- feat: add labelLayout for pie

## 0.1.18

### Patch Changes

- fix: parallel chart error
- fix: no need rose axis

## 0.1.17

### Patch Changes

- feat: add encoding size
- fix: useGrouping missing in format

## 0.1.16

### Patch Changes

- feat: optimize the error info
- feat: optimize pivot table with only dimensions
- fix: same alias error

## 0.1.15

### Patch Changes

- feat: add label and y foramt

## 0.1.14

### Patch Changes

- feat: add label features

## 0.1.13

### Patch Changes

- feat: add label encoding for all chart types

## 0.1.12

### Patch Changes

- feat: replace null to undefined in config
- feat: optimize the detail encoding with color, in column\bar\rose
- feat: add x axis in dual axis

## 0.1.11

### Patch Changes

- feat: empty group id for default group
- feat: add encoding for measures and dimensions
- fix: empty mark style not working for linear color

## 0.1.10

### Patch Changes

- feat: remove tooltip in foldMeasures

## 0.1.9

### Patch Changes

- fix: i18n not working
- feat: rslib with bundle less
- feat: change the dist with esm,cjs,umd

## 0.1.8

### Patch Changes

- feat: optimize the default encoding
- feat: normalizeMeasureTree
- feat: auto push git tag when release

## 0.1.7

### Patch Changes

- feat: optimize encoding

## 0.1.6

### Patch Changes

- feat: add row and column encoding for all chart types
- feat: optimize the default encoding for all chart types

## 0.1.5

### Patch Changes

- feat: add color encoding for all chart types
- fix: all chart default encoding error

## 0.1.4

### Patch Changes

- feat: add encoding for measures and dimensions
- break changes: optimize the default encoding for all chart types

## 0.1.3

### Patch Changes

- feat: add measure encoding for all charts

## 0.1.2

### Patch Changes

- feat: add linear color for encoding

## 0.1.1

### Patch Changes

- - docs: update docs for encoding
  - feat: optimize the default x,y,color,detail of encoding
  - fix: bad cases in encoding

## 0.1.0

### Minor Changes

break changes:

- remove areaRange
- remove groupId in dataset
- remove groupColor in dataset
- rewrite scatter chart
- rewrite all the dataReshape

features:

- add encoding for all chart types

## 0.0.40

### Patch Changes

- - feat: number dim to string
  - fix: optimize the view in column parallel with same dimensions

## 0.0.39

### Patch Changes

- fix: 35/42 issues

## 0.0.38

### Patch Changes

- fix: 30/42 issues

## 0.0.37

### Patch Changes

- fix: 13/33 issues

## 0.0.36

### Patch Changes

- feat: optimize the override theme config

## 0.0.35

### Patch Changes

- feat: optimize the dual axis

## 0.0.34

### Patch Changes

- feat: add dual axis

## 0.0.33

### Patch Changes

- feat: allow empty dimensions and measures

## 0.0.32

### Patch Changes

- fix: annotation default style
- docs: more comments in annotation for llm
- fix: legend max size err

## 0.0.31

### Patch Changes

- fix: optimize the ui and style

## 0.0.30

### Patch Changes

- fix: selector relation ship err

## 0.0.29

### Patch Changes

- feat: optimize pipeline register

## 0.0.28

### Patch Changes

- feat: remove d3 color

## 0.0.27

### Patch Changes

- fix: zod types err

## 0.0.26

### Patch Changes

- fix: same alias error in parallel chart

## 0.0.25

### Patch Changes

- feat: add heatmap
- feat: optimize the zero dimensions style in line\area chart
- fix: stroke error in pie and donut
- feat: optimize the linear color in funnel

## 0.0.24

### Patch Changes

- feat: add radar chart

## 0.0.23

### Patch Changes

- feat: add area range and update spec api

## 0.0.22

### Patch Changes

- feat: add axis sort and legend sort

## 0.0.21

### Patch Changes

- feat: add table and pivot table

## 0.0.20

### Patch Changes

- feat: add table and pivot table

## 0.0.19

### Patch Changes

- breaking-change:
  - theme, move all base config(color, legend, label, tooltip, backgroundColor) to config
  - format, remove round, decimalPlaces

  feat:
  - num format add fractionDigits, significantDigits, roundingPriority,roundingMode
  - linear log and log base

## 0.0.18

### Patch Changes

- fix: data reshape err

## 0.0.17

### Patch Changes

- feat: add scatter, donut, funnel
- feat: optimize line sort
- feat: optimize color mapping

## 0.0.16

### Patch Changes

- feat: add rose roseParallel donut

## 0.0.15

### Patch Changes

- feat: add zVSeed

## 0.0.14

### Patch Changes

- feat: allow same alias
- feat: legend label format
- fix: alias missing error
- docs: optimize guide

## 0.0.13

### Patch Changes

- feat: auto format
- feat: i18n and locale in vseed

## 0.0.12

### Patch Changes

- feat: add measure format
- feat: optimize light and dark theme
- feat: add line style
- feat: add area style
- feat: add point style
- feat: optimize line and bar hover style
- docs: demos for new features

## 0.0.11

### Patch Changes

- feat: add annotation line
- feat: add annotation area
- docs: optimize the guide and demos

## 0.0.10

### Patch Changes

- feat: add annotation point

## 0.0.9

### Patch Changes

- feat: add bar style
- feat: optimize legend
- feat: optimize theme

## 0.0.8

### Patch Changes

- feat: add x and y axis

## 0.0.7

### Patch Changes

- feat: add pie chart

## 0.0.6

### Patch Changes

- feat: combination chart

## 0.0.5

### Patch Changes

- feat: add theme and base config

## 0.0.4

### Patch Changes

- feat: theme and base config

## 0.0.3

### Patch Changes

- release 0.0.3

## 0.0.2

### Patch Changes

- feat: add column and bar chart

## 0.0.1

### Patch Changes

- test release
