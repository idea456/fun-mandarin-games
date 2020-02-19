// the different levels
let animalList = [
  ["狗", require("../../audio/SnakeGame/狗.mp3")],
  ["牛", require("../../audio/SnakeGame/牛.mp3")],
  ["虎", require("../../audio/SnakeGame/虎.mp3")],
  ["蛇", require("../../audio/SnakeGame/蛇.mp3")],
  ["马", require("../../audio/SnakeGame/马.mp3")],
  ["羊", require("../../audio/SnakeGame/羊.mp3")],
  ["猴", require("../../audio/SnakeGame/猴.mp3")],
  ["猪", require("../../audio/SnakeGame/猪.mp3")]
];

let fruitList = [
  ["苹果", require("../../audio/SnakeGame/苹果.mp3")],
  ["杏子", require("../../audio/SnakeGame/杏子.mp3")],
  ["香蕉", require("../../audio/SnakeGame/香蕉.mp3")],
  ["水果", require("../../audio/SnakeGame/水果.mp3")]
];

let vegetableList = [
  ["青椒", require("../../audio/SnakeGame/苹果.mp3")],
  ["生菜", require("../../audio/SnakeGame/杏子.mp3")],
  ["莴苣", require("../../audio/SnakeGame/香蕉.mp3")],
  ["香菜", require("../../audio/SnakeGame/水果.mp3")]
];

// tambah 'obstacles' hanzis di sini
export const hanzis = ["月", "日", "木", "水", "火", "金"];
// tambah nama levels di sini
export const levelsAssets = [
  ["level1", require("../../images/SnakeGame/background.jpg")],
  ["level2", require("../../images/SnakeGame/background2.jpg")],
  ["level3", require("../../images/SnakeGame/background3.jpg")],
  ["level4", require("../../images/SnakeGame/background4.jpg")]
];

// nama_level = [["title level", background_level, level_list]]
let level1 = [
  ["animals", require("../../images/SnakeGame/background.jpg"), animalList],
  ["fruits", require("../../images/SnakeGame/background2.jpg"), fruitList],
  [
    "vegetables",
    require("../../images/SnakeGame/background3.jpg"),
    vegetableList
  ],
  [
    "something1",
    require("../../images/SnakeGame/background3.jpg"),
    vegetableList
  ],
  [
    "something2",
    require("../../images/SnakeGame/background3.jpg"),
    vegetableList
  ],
  [
    "something3",
    require("../../images/SnakeGame/background3.jpg"),
    vegetableList
  ],
  [
    "something4",
    require("../../images/SnakeGame/background3.jpg"),
    vegetableList
  ],
  [
    "something5",
    require("../../images/SnakeGame/background3.jpg"),
    vegetableList
  ]
];

let level2 = [
  ["animals", require("../../images/SnakeGame/background.jpg"), animalList],
  ["fruits", require("../../images/SnakeGame/background.jpg"), fruitList],
  [
    "vegetables",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something1",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something2",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something3",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something4",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something5",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ]
];
let level3 = [
  ["animals", require("../../images/SnakeGame/background.jpg"), animalList],
  ["fruits", require("../../images/SnakeGame/background.jpg"), fruitList],
  [
    "vegetables",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something1",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something2",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something3",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something4",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something5",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ]
];
let level4 = [
  ["animals", require("../../images/SnakeGame/background.jpg"), animalList],
  ["fruits", require("../../images/SnakeGame/background.jpg"), fruitList],
  [
    "vegetables",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something1",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something2",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something3",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something4",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ],
  [
    "something5",
    require("../../images/SnakeGame/background.jpg"),
    vegetableList
  ]
];

export const levels = [level1, level2, level3, level4];
