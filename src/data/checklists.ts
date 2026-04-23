export interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  category: "Financials" | "Search" | "Legal" | "Completion";
}

export const ftbChecklist: ChecklistItem[] = [
  {
    id: "budget",
    task: "Determine your total budget",
    description: "Calculate deposit, legal fees, and stamp duty.",
    category: "Financials",
  },
  {
    id: "mip",
    task: "Get a Mortgage in Principle (MiP)",
    description: "Proof to agents that you can afford the property.",
    category: "Financials",
  },
  {
    id: "solicitor",
    task: "Research conveyancing solicitors",
    description: "Get quotes and read reviews before you find a house.",
    category: "Financials",
  },
  {
    id: "viewings",
    task: "Start property viewings",
    description: "Visit multiple properties to understand market value.",
    category: "Search",
  },
  {
    id: "survey",
    task: "Book a structural survey",
    description: "Essential for understanding property condition.",
    category: "Legal",
  },
  {
    id: "contracts",
    task: "Review & sign contracts",
    description: "Your solicitor will guide you through the paperwork.",
    category: "Legal",
  },
  {
    id: "deposit-pay",
    task: "Pay your exchange deposit",
    description: "Usually 10% of the purchase price.",
    category: "Legal",
  },
  {
    id: "exchange",
    task: "Exchange contracts",
    description: "The point where the deal becomes legally binding.",
    category: "Completion",
  },
  {
    id: "completion",
    task: "Completion day",
    description: "Transfer remaining funds and collect the keys!",
    category: "Completion",
  },
];
