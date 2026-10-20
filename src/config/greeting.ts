export interface GreetingConfig {
  recipient: string;
  title: string;
  heroTitle: { before: string; emphasis: string; after: string };
  subtitle: string;
  intro: string;
  introSubtitle: string;
  greeting: string[];
  card: { title: string; paragraphs: string[]; signature: string };
  wishes: string[];
  bouquetMessage: string;
  finalMessage: string;
  music: { src: string | null; volume: number };
  effects: { petals: boolean; cursor: boolean; petalCount: number };
}

export const greeting: GreetingConfig = {
  recipient: "chị",
  title: "Gửi chị một chút dịu dàng của tháng Mười",
  heroTitle: { before: "Gửi chị một chút", emphasis: "dịu dàng", after: "của tháng Mười" },
  subtitle: "Happy Vietnamese Women's Day",
  intro: "Chị ơi, em có một món quà nhỏ dành cho chị…",
  introSubtitle: "Một chút hoa, một chút yêu thương, gửi chị nhân ngày 20/10.",
  greeting: [
    "Chị ơi, nhân ngày 20/10, em chúc chị luôn xinh đẹp, vui vẻ và gặp thật nhiều điều tốt đẹp trong cuộc sống. Mong chị lúc nào cũng có thật nhiều lý do để mỉm cười, luôn được mọi người yêu thương và trân trọng.",
    "Dù công việc hay cuộc sống có đôi lúc mệt mỏi, chị cũng nhớ chăm sóc bản thân, nghỉ ngơi thật tốt và đừng quên rằng chị xứng đáng với những điều dịu dàng nhất.",
    "Chúc chị có một ngày 20/10 thật vui, thật ấm áp và luôn hạnh phúc theo cách của riêng mình nhé! 💗🌷",
  ],
  card: {
    title: "Gửi chị một chút dịu dàng của tháng Mười 🌷",
    paragraphs: [
      "Em mong chị luôn gặp những điều tử tế, có thật nhiều niềm vui từ những điều giản dị và luôn đủ mạnh mẽ để làm những điều chị mong muốn.",
      "Cảm ơn chị vì đã là một người chị thân thiết và đáng quý. Mong rằng không chỉ riêng ngày 20/10 mà cả những ngày bình thường nữa, chị cũng luôn cảm nhận được sự yêu thương, quan tâm và trân trọng.",
      "Chúc chị luôn bình an, rạng rỡ và hạnh phúc nhé. 💗",
    ],
    signature: "Em gửi chị — cùng thật nhiều lời chúc tốt đẹp ♡",
  },
  wishes: [
    "Chúc chị ngày nào cũng có chuyện vui để kể nha.",
    "Mong chị luôn xinh đẹp, bình an và gặp nhiều may mắn.",
    "Mệt thì nhớ nghỉ ngơi, đừng ôm hết mọi chuyện một mình nhé chị.",
    "Chúc mọi điều chị mong đợi đều dần trở thành hiện thực.",
    "Mong nụ cười luôn ở trên môi chị, không chỉ riêng hôm nay.",
    "Chúc chị luôn được yêu thương và trân trọng đúng như chị xứng đáng.",
    "Mong những ngày phía trước của chị nhẹ nhàng và rực rỡ hơn.",
    "Chúc chị luôn giữ được sự vui vẻ và đáng yêu của mình.",
    "Mong chị có thật nhiều khoảnh khắc bình yên giữa những ngày bận rộn.",
    "Chúc chị 20/10 ngập tràn hoa, niềm vui và những điều dễ thương.",
  ],
  bouquetMessage: "Bó hoa này em gửi tặng chị, chúc chị 20/10 thật vui nhé!",
  finalMessage: "Mong chị luôn hạnh phúc, không chỉ trong ngày hôm nay mà cả những ngày sau này nữa. Chúc chị luôn gặp những người chân thành, những điều tử tế và thật nhiều bình yên. 20/10 vui vẻ nha chị! 💗",
  music: { src: null, volume: 0.3 },
  effects: { petals: true, cursor: true, petalCount: 14 },
};
