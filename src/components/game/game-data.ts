export type Pair = {
  id: number;
  esquerda: string;
  direita: string;
};

export type GameMode = {
  id: string;
  label: string;
  pairs: Pair[];
};

export type PairId = Pair["id"];
export type Placements = Partial<Record<PairId, PairId>>;
export type BoxSnapshot = {
  top: number;
  left: number;
  width: number;
  height: number;
};
export type FlyingMatch = {
  id: PairId;
  from: BoxSnapshot;
  to: BoxSnapshot;
};

export const HOTEL_PAIRS: Pair[] = [
  { id: 1, esquerda: "a chave do quarto", direita: "the room key" },
  { id: 2, esquerda: "uma toalha extra", direita: "an extra towel" },
  { id: 3, esquerda: "um travesseiro extra", direita: "an extra pillow" },
  { id: 4, esquerda: "um cobertor extra", direita: "an extra blanket" },
  { id: 5, esquerda: "mais papel higi\u00eanico", direita: "some more toilet paper" },
  { id: 6, esquerda: "mais sabonete", direita: "some more soap" },
  { id: 7, esquerda: "mais shampoo", direita: "some more shampoo" },
  { id: 8, esquerda: "a senha do wi-fi", direita: "the Wi-Fi password" },
  { id: 9, esquerda: "um mapa da cidade", direita: "a city map" },
  { id: 10, esquerda: "um quarto silencioso", direita: "a quiet room" },
  { id: 11, esquerda: "um quarto com vista", direita: "a room with a view" },
  { id: 12, esquerda: "um quarto no andar de cima", direita: "a room on a higher floor" },
  { id: 13, esquerda: "um despertador \u00e0s 6", direita: "a wake-up call at 6" },
  { id: 14, esquerda: "a nota fiscal", direita: "the receipt" },
  { id: 15, esquerda: "a conta", direita: "the bill" },
  { id: 16, esquerda: "ajuda com a bagagem", direita: "help with the luggage" },
  { id: 17, esquerda: "um t\u00e1xi", direita: "a taxi" },
  { id: 18, esquerda: "\u00e1gua", direita: "some water" },
  { id: 19, esquerda: "mais tempo", direita: "some more time" },
  { id: 20, esquerda: "check-out tardio", direita: "a late check-out" },
];

export const TRAVEL_CORE_BLOCKS: Pair[] = [
  { id: 1, esquerda: "Onde fica...?", direita: "Where is...?" },
  { id: 2, esquerda: "Qual \u00e9...?", direita: "What is...?" },
  { id: 3, esquerda: "Meu/minha ... est\u00e1...?", direita: "Is my ... ...?" },
  { id: 4, esquerda: "Estou ficando por...", direita: "I'm staying for..." },
  { id: 5, esquerda: "Estou aqui para...", direita: "I'm here for..." },
  { id: 6, esquerda: "Eu preciso de...", direita: "I need..." },
  { id: 7, esquerda: "Eu gostaria de...", direita: "I'd like..." },
  { id: 8, esquerda: "Posso...?", direita: "Can I...?" },
  { id: 9, esquerda: "Como eu chego a/ao...?", direita: "How do I get to...?" },
  { id: 10, esquerda: "Aqui est\u00e1 meu/minha...", direita: "Here is my..." },
  { id: 11, esquerda: "Esta \u00e9 minha...", direita: "This is my..." },
  { id: 12, esquerda: "Tenho uma...", direita: "I have a..." },
  { id: 13, esquerda: "N\u00e3o tenho...", direita: "I don't have..." },
  { id: 14, esquerda: "Que horas...?", direita: "What time...?" },
  { id: 15, esquerda: "Voc\u00ea pode...?", direita: "Can you...?" },
];

export const GAME_MODES: GameMode[] = [
  { id: "hotel-pairs", label: "Hotel Pairs", pairs: HOTEL_PAIRS },
  { id: "travel-core-blocks", label: "Travel Core Blocks", pairs: TRAVEL_CORE_BLOCKS },
];

export const ROUND_SIZE = 5;
export const MATERIAL_PDF_PATH = "/material.pdf";
export const MATCH_POP_DURATION_MS = 650;
