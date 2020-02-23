let animalList = [
  ["狗", "Gǒu", 4, require("../../audio/IceCreamGame/狗.mp3")],
  ["牛", "Niú", 3, require("../../audio/IceCreamGame/牛.mp3")],
  ["马", "Mǎ", 3, require("../../audio/IceCreamGame/马.mp3")]
];

let vegetableList = [
  ["狗", "Gǒu", 2, require("../../audio/IceCreamGame/狗.mp3")],
  ["牛", "Niú", 2, require("../../audio/IceCreamGame/牛.mp3")],
  ["马", "Mǎ", 3, require("../../audio/IceCreamGame/马.mp3")]
];

export const levelsAssets = [
  ["level1", require("../../images/IceCream/background.jpg")],
  ["level2", require("../../images/IceCream/background.jpg")]
];

// nama_level = [["title level", background_level, level_list]]
let level1 = [
  ["animals", require("../../images/IceCream/background.jpg"), animalList],
  ["vegetables", require("../../images/IceCream/background.jpg"), vegetableList]
];
let level2 = [
  ["animals", require("../../images/IceCream/background.jpg"), animalList],
  ["vegetables", require("../../images/IceCream/background.jpg"), vegetableList]
];

export const levels = [level1, level2];
