export type Pair = {
  id: number;
  esquerda: string;
  direita: string;
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
  { id: 5, esquerda: "mais papel higiênico", direita: "some more toilet paper" },
  { id: 6, esquerda: "mais sabonete", direita: "some more soap" },
  { id: 7, esquerda: "mais shampoo", direita: "some more shampoo" },
  { id: 8, esquerda: "a senha do wi-fi", direita: "the Wi-Fi password" },
  { id: 9, esquerda: "um mapa da cidade", direita: "a city map" },
  { id: 10, esquerda: "um quarto silencioso", direita: "a quiet room" },
  { id: 11, esquerda: "um quarto com vista", direita: "a room with a view" },
  { id: 12, esquerda: "um quarto no andar de cima", direita: "a room on a higher floor" },
  { id: 13, esquerda: "um despertador às 6", direita: "a wake-up call at 6" },
  { id: 14, esquerda: "a nota fiscal", direita: "the receipt" },
  { id: 15, esquerda: "a conta", direita: "the bill" },
  { id: 16, esquerda: "ajuda com a bagagem", direita: "help with the luggage" },
  { id: 17, esquerda: "um táxi", direita: "a taxi" },
  { id: 18, esquerda: "água", direita: "some water" },
  { id: 19, esquerda: "mais tempo", direita: "some more time" },
  { id: 20, esquerda: "check-out tardio", direita: "a late check-out" },
];

export const ROUND_SIZE = 5;
export const MATERIAL_PDF_PATH = "/material.pdf";
export const MATCH_POP_DURATION_MS = 650;
