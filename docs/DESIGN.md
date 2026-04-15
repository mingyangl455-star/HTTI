# HTTI 设计说明 — 类 MBTI 形象关系测试

本项目为静态网页：12 道情境题（是 / 否 / 不一定）→ 六维用户向量 → 与预设形象比对 → 输出关系标签与文案。实现见 [`js/quiz-data.js`](../js/quiz-data.js)、[`js/personas-data.js`](../js/personas-data.js)、[`js/app.js`](../js/app.js)。

---

## 1. 计分与「不一定」

- 用户侧为 **六维连续值**，每维约在 \([-1, 1]\)。
- 每题在若干维度上有 `yes` / `no` / `uncertain` 权重；**「不一定」按 0 分处理**（不参与该题分子累加，但分母仍按该题对应该维的 `|yes|+|no|` 缩放），详见 `quiz-data.js` 注释。

---

## 2. 六个维度

| id | 名称 | 含义概要 |
| --- | --- | --- |
| `social` | 社交能量 | 独处与社交之间的恢复与主动性 |
| `structure` | 计划条理 | 对计划、规则与可预期性的偏好 |
| `conflict_direct` | 冲突直面 | 分歧时当场厘清 vs 先缓冲 |
| `emotion_expr` | 情感外露 | 倾诉、外显与幽默表达倾向 |
| `risk` | 风险接受 | 对不确定性与冒险的接受度 |
| `authority` | 权威依从 | 对经验、层级与指导的配合度 |

各题 `weights` 见 `quiz-data.js`。

---

## 3. 归一化与相似度

### 3.1 答题累加

按 `questions[].weights` 将每维原始分累加；`yes` / `no` 为加权贡献，`uncertain` 为 0。

### 3.2 用户向量归一化

对维度 \(d\)，设 \(R_d\) 为 12 题在该维上的加权和，\(M_d\) 为「若每题都取绝对值最大的 yes/no 权重」时的上界。定义：

\[
U_d = \mathrm{clamp}(R_d / M_d,\,-1,\,1)
\]

得到用户 **单位方向** \(U \in [-1,1]^6\)（实现中再与形象向量做点积相关运算，见 `app.js`）。

### 3.3 与形象的匹配度

形象 `vector` 各维在 \([-1,1]\)。与用户向量的 **方向一致程度** 用点积刻画（与 \(\cos\) 等价），再线性映射到 **合拍度** \(s \in [0,1]\)：

\[
s = (\cos + 1) / 2 \in [0,1]
\]

\(s\) 越高表示六维习惯越接近；\(\cos=0\) 对应「正交」、合拍度居中。

---

## 4. 题目与维度对应（摘要）

见 [`js/quiz-data.js`](../js/quiz-data.js) 中各题 `weights`。

| 题 | 情境侧重 | 主要维度 |
| --- | --- | --- |
| q1 | 临时邀约 | social, structure |
| q2 | 任务拆分 | structure |
| q3 | 分歧当场说 | conflict_direct, emotion_expr |
| q4 | 难受找人聊 | emotion_expr, social |
| q5 | 回报与风险 | risk, structure |
| q6 | 听「过来人」建议 | authority |
| q7 | 陌生场合主动 | social |
| q8 | deadline 打乱 | structure, emotion_expr |
| q9 | 不守规矩是否指出 | conflict_direct, authority |
| q10 | 玩笑表达情绪 | emotion_expr, social |
| q11 | 独自去陌生城市 | risk, social |
| q12 | 计划细 vs 听指导 | structure, authority |

---

## 5. 关系目录

`relationshipCatalog` 中每项含 `id`、`title`、`blurb` 等。

| id | 中文名 | 备注 |
| --- | --- | --- |
| `soulmate` | 灵魂伴侣档 | 高合拍等 |
| `best_friend` | 死党 | 高合拍、损友感 |
| `mirror` | 镜像知己 | 合拍中高 |
| `mentor` | 师徒 / 带路人 | 结构、权威差与合拍组合 |
| `student` | 学徒 / 爱闯祸跟班 | 风险、结构差等 |
| `work_ally` | 职场战友 | 事能对齐 |
| `party_buddy` | 酒肉搭子 | 社交与 `partyEnergy` 等 |
| `frienemy` | 损友 / 冤家 | 合拍中等、冲突维突出 |
| `rival` | 对手 / 暗暗较劲 | 冲突、rivalBias 等 |
| `enemy` | 八字不合 | 低合拍或强对立 |
| `stranger` | 路人缘 | 合拍偏低 |

（具体阈值与覆盖规则以 `app.js` 为准。）

---

## 6. 合拍度分档与默认关系

按 **合拍度** `s` 与 `minSim` 落入 `relationshipBands`：

| minSim（下限） | relationId |
| --- | --- |
| 0.82 | soulmate |
| 0.68 | best_friend |
| 0.54 | mirror |
| 0.42 | stranger |
| 0.30 | frienemy |
| -1 | enemy |

高合拍时可能因 **修饰规则** 覆盖为 `soulmate` 等，见 `app.js`。

---

## 7. 修饰与优先级（摘要）

逻辑在 [`js/app.js`](../js/app.js)，以下为 **概念** 顺序，以代码为准：

1. **强对立 `enemy`**：点积过低且 `s` 过低等条件。
2. **`mentor`**：`structure`、`authority` 等差与合拍区间、`mentorBias` 等。
3. **`student`**：`structure` / `risk` 等与 `s` 组合。
4. **`party_buddy`**：`s` 与 `archetypeHints.partyEnergy` 等。
5. **`work_ally`**：`s` 与 `structure`、`emotion_expr` 等。
6. **`rival`**：`s` 与 `conflict_direct`、`rivalBias` / `rebel` 等。

多条命中时按 **`priority`** 等字段决选。

---

## 8. 形象数据字段

见 [`js/personas-data.js`](../js/personas-data.js)。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 形象 id |
| `name` | string | 显示名 |
| `avatar` | string | 头像路径（如 SVG） |
| `tagline` | string | 一句话 |
| `traits` | string[] | 标签式特点 |
| `vector` | object | 六维 id → \([-1,1]\) |
| `archetypeHints` | object | 如 `mentorBias`、`partyEnergy`、`rivalBias`、`rebel`、`balanced` |

**向量** 与题目权重语义一致；**填写形象** 时各维建议在 **闭区间 [-1,1]**，与题目 ±1 量纲一致。

---

## 9. 本地预览

建议用本地 HTTP 服务，避免 `file://` 下部分行为不一致：

```bash
cd /path/to/htti
python3 -m http.server 8080
```

浏览器打开 `http://127.0.0.1:8080/`。

---

## 10. 扩展与维护

- 改题目或维度：编辑 `quiz-data.js` / `personas-data.js` 后刷新页面即可（无构建步骤）。
- 中文结果长文案：仓库中 `_app_zh.json` 与生成脚本 `_regen_app_js.py` 维护，生成后写入 `js/app.js`。
- GitHub Pages：根目录放置 **`.nojekyll`**，按分支静态发布，**不使用 Jekyll**，避免对 `docs/*.md` 做无效构建。
