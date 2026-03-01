import type { ModalVerb, ModalPerson } from "./modal-exercises";

const modalConjugations: Record<ModalVerb, Record<ModalPerson, string>> = {
  können: {
    "ich": "kann",
    "du": "kannst",
    "er/sie/es": "kann",
    "wir": "können",
    "ihr": "könnt",
    "sie/Sie": "können",
  },
  müssen: {
    "ich": "muss",
    "du": "musst",
    "er/sie/es": "muss",
    "wir": "müssen",
    "ihr": "müsst",
    "sie/Sie": "müssen",
  },
  dürfen: {
    "ich": "darf",
    "du": "darfst",
    "er/sie/es": "darf",
    "wir": "dürfen",
    "ihr": "dürft",
    "sie/Sie": "dürfen",
  },
  sollen: {
    "ich": "soll",
    "du": "sollst",
    "er/sie/es": "soll",
    "wir": "sollen",
    "ihr": "sollt",
    "sie/Sie": "sollen",
  },
  wollen: {
    "ich": "will",
    "du": "willst",
    "er/sie/es": "will",
    "wir": "wollen",
    "ihr": "wollt",
    "sie/Sie": "wollen",
  },
  mögen: {
    "ich": "mag",
    "du": "magst",
    "er/sie/es": "mag",
    "wir": "mögen",
    "ihr": "mögt",
    "sie/Sie": "mögen",
  },
};

export default modalConjugations;
